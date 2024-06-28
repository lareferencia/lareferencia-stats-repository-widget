import { Grid, GridItem } from "@chakra-ui/react";
import { MapChart } from "./MapChart";
import { TFunction } from "i18next";
import { ByCountryStats } from "../../../../../interfaces/byCountry.interface";
import { RegionsSelector } from "../../components/RegionsSelector";
import { CountriesList } from "./CountriesList";
import { getRegionsByCountry } from "./utils/regionMapping";
import { useState } from "react";

type Props = {
  data: ByCountryStats;
  t: TFunction;
};

export const MapSectionContainer = ({ data, t }: Props) => {
  const regions = getRegionsByCountry(data.country.buckets);
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

        <CountriesList t={t} data={data} regionSelected={regionSelected} />
      </GridItem>

      <MapChart
        regionSelected={regionSelected}
        buckets={data.country.buckets}
        t={t}
      />
    </Grid>
  );
};
