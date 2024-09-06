import React, { useState, useEffect } from "react";
import { repositoryWs, fetchData } from "./api/api";
import {
  DEFAULT_EMBED_FUNCTION_NAME,
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
  DEFAULT_TIME_UNIT,
} from "./config";

import { useTranslation } from "react-i18next";

import { Box } from "@chakra-ui/react";

const Loading = React.lazy(() => import("./components/ui/Loading"));
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
  const widgetParams = (window as any)[embbedFunction];

  // Repositories list and default repository
  const repositoriesList: Repository[] =
    (widgetParams && widgetParams.parameters.repositories_list) || [];

  const defaultRepository: Repository = (widgetParams &&
    widgetParams.parameters.default_repository) || {
    label: "seleccionar repositorio",
    value: "",
  };

  const [selectedRepository, setSelectedRepository] =
    useState<Repository>(defaultRepository);

  // stablish in startDate the date of one year ago
  const currentDate = new Date();
  const [startDate, setStartDate] = useState<Date>(
    new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1)
  );
  const [endDate, setEndDate] = useState<Date>(currentDate);
  const start_date = startDate || DEFAULT_START_DATE; //TODO: poner startDate
  const end_date = endDate || DEFAULT_END_DATE; //TODO: poner endDate

  // Fetch data from API
  const fetchDataAsync = async () => {
    if (selectedRepository.value === "") {
      setSelectedRepository(defaultRepository);
    } //TODO: ver luego

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
        start_date,
        end_date,
        DEFAULT_TIME_UNIT
      );
      if (resp.level) {
        if (resp.level.buckets.length === 0) {
          setErrorMessage(t("no-statistics"));
          setError(true);
        } else {
          setData(resp);
        }
      } else {
        setErrorMessage(t("no-data"));
        setError(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDataAsync();
  }, [refresh]);

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
          />
        </Box>
        <LangSelector i18n={i18n} t={t} />
      </Box>
      {!error ? (
        <Box maxW="1444px" m="auto" fontWeight="400" p="1rem">
          {isLoading || !data ? (
            <Loading />
          ) : (
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
            />
          )}
          <Box px='4'>
            <Footer />
          </Box>
        </Box>
      ) : (
        <ErrorView errorMessage={errorMessage} />
      )}
    </>
  );
}

export default App;
