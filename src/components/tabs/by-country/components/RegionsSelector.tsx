import {
  Badge,
  Box,
  Button,
} from "@chakra-ui/react";
import { TFunction } from "i18next";

type Props = {
  regions: { name: string; countries: string[] }[];
  regionSelected: string;
  setRegionSelected: (region: string) => void;
  t: TFunction;
};

export const RegionsSelector = ({
  regions,
  regionSelected,
  setRegionSelected,
  t,
}: Props) => {
  const handleSelectRegion = (region: string) => {    
    setRegionSelected(region);
  };
  

  return (
    <Box display="flex" flexWrap="wrap" gap="2">
      {regions.map((region) => (
        <Button
          variant={regionSelected === region.name ? "solid" : "outline"}
          p="1.5"
          size="x"
          key={region.name}
          onClick={() => handleSelectRegion(region.name)}
        >
          {t(region.name)}
          <Badge colorScheme="teal" ml="2" borderRadius="50px" px="2">
            {region.countries.length}
          </Badge>
        </Button>
      ))}
    </Box>
  );
};
