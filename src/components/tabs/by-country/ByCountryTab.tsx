import { useEffect, useState } from "react";


import { Box, Card } from "@chakra-ui/react";

import { TFunction } from "i18next";
import { EventLabels } from "../../../interfaces/stadistics.interface";
import { ByCountryStats, CountryObject, Repository } from "../../../interfaces";
import { byCountryWs, fetchData } from "../../../api/api";
import { DEFAULT_END_DATE, DEFAULT_IDENTIFIER, DEFAULT_START_DATE, DEFAULT_TIME_UNIT } from "../../../config";
import Loading from "../../ui/Loading";
import ErrorView from "../../ui/ErrorView";
import { ByCountryPanels, ByCountryTable } from "./components";
import { PieChart } from "./chart/PieChart";
import { MapSectionContainer } from "./chart/map-chart";


type ByCountryTabProps = {
  tabIndex: number;
  eventLabels: EventLabels;
  t: TFunction;
  selectedRepository: Repository;
};

const ByCountryTab = ({
  tabIndex,
  eventLabels,
  t,
  selectedRepository,
}: ByCountryTabProps) => {
  const [data, setData] = useState<ByCountryStats>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [country, setCountry] = useState<CountryObject>();


  const fetchDataAsync = async () => {

    
    setIsLoading(true);
    try {
      const resp: ByCountryStats = await fetchData(
        byCountryWs,
        DEFAULT_IDENTIFIER,
        selectedRepository.value,
        DEFAULT_START_DATE,
        DEFAULT_END_DATE,
        DEFAULT_TIME_UNIT
      );

      if (resp.country.buckets.length > 0) {
        setData(resp);
        
      } else {
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
  }, []);

  return (
    <Box>
      {isLoading && <Loading />}

      {error && <ErrorView errorMessage={'Mensaje de error'} />}

      {data && (
        <Box>
          {country && (
            <ByCountryPanels
              country={country}
              eventLabels={eventLabels}
              t={t}
            />
          )}
          <Card padding="4" shadow="sm" borderRadius="12" my="6">
            <PieChart
              tabIndex={tabIndex}
              data={data}
              setCountry={setCountry}
              t={t}
            />
          </Card>
          <Card padding="4" shadow="sm" borderRadius="12">
            <MapSectionContainer data={data} t={t} />
          </Card>
          <ByCountryTable data={data} eventLabels={eventLabels} t={t} />
        </Box>
      )}
    </Box>
  );
};
  

export default ByCountryTab;