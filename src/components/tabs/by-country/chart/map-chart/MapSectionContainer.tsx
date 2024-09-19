import { Grid, GridItem } from "@chakra-ui/react";
// import { MapChart } from "./MapChart";
import { TFunction } from "i18next";
import { ByCountryStats } from "../../../../../interfaces/byCountry.interface";
// import { RegionsSelector } from "../../components/RegionsSelector";
import { CountriesList } from "./CountriesList";
import { getRegionsByCountry } from "./utils/regionMapping";
import React, { useState } from "react";
import { processRawData } from "../../../../../utils/process-raw-data";

const RegionsSelector = React.lazy(() => import("../../components/RegionsSelector"));
const MapChart = React.lazy(() => import("./MapChart"));



type Props = {
  data: ByCountryStats;
  t: TFunction;
};

const MapSectionContainer = ({ data, t }: Props) => {
  const processedData = processRawData(data);
  const regions = getRegionsByCountry(processedData);
  
  const [regionSelected, setRegionSelected] = useState(regions[0].name);


  return (
    <Grid templateColumns="repeat(7, 1fr)">
      <GridItem w="100%" colSpan={3} p="4">
        <RegionsSelector
          t={t}
          regions={regions}
          regionSelected={regionSelected}
          setRegionSelected={setRegionSelected}
        />

        <CountriesList t={t} processedData={processedData} regionSelected={regionSelected} />
      </GridItem>

      <MapChart
        regionSelected={regionSelected}
        processedData={processedData}
        t={t}
      />
    </Grid>
  );
};

export default MapSectionContainer;