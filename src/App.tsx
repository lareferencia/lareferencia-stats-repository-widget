import React, { useState, useEffect } from "react";
import { repositoryWs, fetchData } from "./api/api";
import {
  DEFAULT_EMBED_FUNCTION_NAME,
  DEFAULT_END_DATE,
  DEFAULT_IDENTIFIER,
  DEFAULT_SOURCE_ID,
  DEFAULT_START_DATE,
  DEFAULT_TIME_UNIT,
} from "./config";

import { useTranslation } from "react-i18next";

import { Box } from "@chakra-ui/react";

const Loading            = React.lazy(() => import("./components/ui/Loading"));
const ErrorView          = React.lazy(() => import("./components/ui/ErrorView"));
const TabsContainer    = React.lazy(() => import("./components/tabs/TabsContainer") );
const LangSelector       = React.lazy(() => import("./components/ui/LangSelector")) 
const RepositorySelector = React.lazy(() => import("./components/ui/RepositorySelector")) 

import { Statistics } from "./interfaces/stadistics.interface";
import { getEventLabels, getScopeLabels } from "./utils/scopes-and-events";
import { Repository } from "./interfaces/repository.interface";



function App() {
  // Translation React hook
  const { t, i18n } = useTranslation();

  // Data, loading and error states
  const [data, setData] = useState<Statistics>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // LRHW widget parameters
  const embbedFunction = DEFAULT_EMBED_FUNCTION_NAME;
  const widgetParams = (window as any)[embbedFunction];

  const sourceId: string =
    (widgetParams && widgetParams.parameters.repository_source) ||
    DEFAULT_SOURCE_ID;

  const repositoriesList: Repository[] =
    (widgetParams && widgetParams.parameters.repositories_list) || [];

  const defaultRepository: Repository = (widgetParams &&
    widgetParams.parameters.default_repository) || {
    label: "seleccionar repositorio",
    value: "",
  };

  const [selectedRepository, setSelectedRepository] = useState<Repository>({
    label: "seleccionar repositorio",
    value: "",
  });

  // stablish in startDate the date of one year ago
  const currentDate = new Date();
  const [startDate, setStartDate] = useState<Date>(
    new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1)
  );
  const [endDate, setEndDate] = useState<Date>(currentDate);

  // Refresh data button state
  const [refresh, setRefresh] = useState(false);

  // Fetch data from API
  const start_date = startDate || DEFAULT_START_DATE;
  const end_date = endDate || DEFAULT_END_DATE;

  const fetchDataAsync = async () => {
    if (selectedRepository.value === "") {
      setSelectedRepository(defaultRepository);
    }
    setError(false);
    setIsLoading(true);
    try {
      const resp: Statistics = await fetchData(
        repositoryWs,
        DEFAULT_IDENTIFIER,
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
  }, [sourceId, refresh]);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px="4"
        pt="4"
        maxW="1444px"
        m="auto"
      >
        <RepositorySelector
          repositoriesList={repositoriesList}
          selectedRepository={selectedRepository}
          setSelectedRepository={setSelectedRepository}
          refresh={refresh}
          setRefresh={setRefresh}
        />
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
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              refresh={refresh}
              setRefresh={setRefresh}
              selectedRepository={selectedRepository}
            />
          )}
        </Box>
      ) : (
        <ErrorView errorMessage={errorMessage} />
      )}
    </>
  );
}

export default App;
