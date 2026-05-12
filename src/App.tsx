import React, { Suspense, useState, useEffect, useMemo, useCallback } from "react";
import { repositoryWs, fetchData } from "./api/api";
import {
  DEFAULT_EMBED_FUNCTION_NAME,
  DEFAULT_TIME_UNIT,
} from "./config";
import { subMonths, startOfMonth } from "date-fns";

import { useTranslation } from "react-i18next";

import { Box } from "@chakra-ui/react";
import Loading from "./components/ui/Loading";

const ErrorView = React.lazy(() => import("./components/ui/ErrorView"));
const TabsContainer = React.lazy(
  () => import("./components/tabs/TabsContainer")
);
const LangSelector = React.lazy(() => import("./components/ui/LangSelector"));
const RepositorySelector = React.lazy(
  () => import("./components/ui/RepositorySelector")
);

import { Statistics } from "./interfaces/stadistics.interface";
import { getEventLabels, getScopeLabels } from "./utils/scopes-and-events";
import { Repository } from "./interfaces/repository.interface";
import { DatesPicker } from "./components/ui/DatesPicker";
import { Footer } from "./components/ui/Footer";

  type WidgetConfig = {
    parameters: {
      repositories_list?: Repository[];
      default_repository?: Repository;
    };
  };

  function App() {

  
  // Translation React hook
  const { t, i18n } = useTranslation();

  // Data, loading and error states
  const [data, setData] = useState<Statistics>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [refresh, setRefresh] = useState(false);

  // LRHW widget parameters
  const embbedFunction = DEFAULT_EMBED_FUNCTION_NAME;
  const widgetParams = (window as unknown as Record<string, WidgetConfig>)[embbedFunction];

  // Repositories list and default repository
  const repositoriesList: Repository[] =
    (widgetParams && widgetParams.parameters.repositories_list) || [];

  const defaultRepository = useMemo<Repository>(() => (widgetParams &&
    widgetParams.parameters.default_repository) || {
    label: "seleccionar repositorio",
    value: "",
  }, []);

  const [selectedRepository, setSelectedRepository] =
    useState<Repository>(defaultRepository);

  // Establish initial dates (undefined until dataEndDate is discovered)
  const [dataEndDate, setDataEndDate] = useState<Date | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // Fetch data from API (only runs when dates are defined)
  const fetchDataAsync = useCallback(async () => {
    // Don't fetch until we have proper dates
    if (!startDate || !endDate) return;

    if (selectedRepository.value === "") {
      setSelectedRepository(defaultRepository);
    }

    setError(false);
    setIsLoading(true);

    if (repositoriesList.length <= 0 && !defaultRepository.value) {
      setError(true);
      setErrorMessage("Error en la configuracion del widget");
      setIsLoading(false);
      return;
    }

    try {
      const resp: Statistics = await fetchData(
        repositoryWs,
        selectedRepository.value || defaultRepository.value,
        startDate,
        endDate,
        DEFAULT_TIME_UNIT
      );
      if (resp.level) {
        if (resp.level.buckets.length === 0) {
          setErrorMessage(t("no-statistics"));
          setError(true);
        } else {
          setData(resp);
          // Derive dataEndDate from the last time bucket
          if (resp.time.buckets.length > 0) {
            const lastBucket = resp.time.buckets[resp.time.buckets.length - 1];
            setDataEndDate(new Date(lastBucket.key_as_string));
          }
        }
      } else {
        setErrorMessage(t("no-data"));
        setError(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedRepository, defaultRepository, repositoriesList, startDate, endDate, t]);

  // Discovery effect: on mount, fetch with very old start date to discover dataEndDate
  useEffect(() => {
    const discoverDataEndDate = async () => {
      setIsLoading(true);
      setError(false);

      if (repositoriesList.length <= 0 && !defaultRepository.value) {
        setError(true);
        setErrorMessage("Error en la configuracion del widget");
        setIsLoading(false);
        return;
      }

      try {
        // Use a very old start date to get all historical data
        const discoveryStartDate = new Date(2000, 0, 1); // Jan 1, 2000
        const resp: Statistics = await fetchData(
          repositoryWs,
          selectedRepository.value || defaultRepository.value,
          discoveryStartDate,
          new Date(), // end date = now
          DEFAULT_TIME_UNIT
        );

        if (resp.time && resp.time.buckets && resp.time.buckets.length > 0) {
          const lastBucket = resp.time.buckets[resp.time.buckets.length - 1];
          const discoveredDataEndDate = new Date(lastBucket.key_as_string);
          setDataEndDate(discoveredDataEndDate);

          // Set proper date range: 1 year before dataEndDate to dataEndDate
          const oneYearAgo = startOfMonth(subMonths(discoveredDataEndDate, 12));
          setStartDate(oneYearAgo);
          setEndDate(startOfMonth(discoveredDataEndDate));
        } else {
          setErrorMessage(t("no-data"));
          setError(true);
        }
      } catch (error) {
        console.error("Error discovering dataEndDate:", error);
        setError(true);
        setErrorMessage(t("no-data"));
      }
      setIsLoading(false);
    };

    discoverDataEndDate();
  }, [selectedRepository, defaultRepository, repositoriesList, t]);

  // Fetch data when refresh is toggled or repository changes (dates already set by discovery)
  useEffect(() => {
    fetchDataAsync();
  }, [refresh, selectedRepository, fetchDataAsync]);

  return (
    <>
      <Box
        display="flex"
        flexWrap="wrap"
        gap="2"
        justifyContent="space-between"
        alignItems="center"
        px="4"
        pt="4"
        maxW="1444px"
        m="auto"
      >
        <Box display="flex" gap="2" flexWrap="wrap">
          <RepositorySelector
            repositoriesList={repositoriesList}
            selectedRepository={selectedRepository}
            setSelectedRepository={setSelectedRepository}
            refresh={refresh}
            setRefresh={setRefresh}
          />
          <DatesPicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            refresh={refresh}
            setRefresh={setRefresh}
            t={t}
            maxSelectableDate={dataEndDate}
          />
        </Box>
        <LangSelector i18n={i18n} t={t} />
      </Box>
      {!error ? (
        <Box maxW="1444px" m="auto" fontWeight="400" p="1rem">
          {isLoading || !data ? (
            <Loading />
          ) : (
            <Suspense fallback={<Loading />}>
              <TabsContainer
                data={data}
                t={t}
                scopeLabels={getScopeLabels(widgetParams, t)}
                eventLabels={getEventLabels(t)}
                selectedRepository={selectedRepository}
                startDate={startDate}
                endDate={endDate}
                refresh={refresh}
                setRefresh={setRefresh}
                setStartDate={setStartDate}
                dataEndDate={dataEndDate}
              />
            </Suspense>
          )}
          <Box mt="4">
            <Footer />
          </Box>
        </Box>
      ) : (
        <Suspense fallback={<Loading />}>
          <ErrorView errorMessage={errorMessage} />
        </Suspense>
      )}
    </>
  );
}

export default App;
