import { Badge, Box, Divider, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { getCountriesByRegionSelected } from "./utils/getCountriesByRegionSelected";
import Loading from "../../../../ui/Loading";
import { TFunction } from "i18next";
import { ProcessedData } from "../../../../../interfaces";

type Props = {
  regionSelected: string;
  processedData: ProcessedData[];
  t: TFunction;
};

type CountryList = {
  name: string;
  value: number;
};

export const CountriesList = ({ regionSelected, processedData, t }: Props) => {
  const [countriesToShow, setCountriesToShow] = useState<CountryList[]>();

  useEffect(() => {
    const countryiesToShow = getCountriesByRegionSelected(
      regionSelected,
      processedData
    ).map((country) => ({
      name: country.name,
      value: country.downloads + country.views + country.outlinks,
    }));

    setCountriesToShow(countryiesToShow);
  }, [regionSelected]);

  return (
    <>
      {!countriesToShow ? (
        <Loading />
      ) : (
        <>
          <Box as="ul" mt="8" display="flex" flexDir="column" gap="4">
            <Text as="span" fontWeight="bold" fontSize="1.4rem">
              {t("total-events-by-country")}
            </Text>
            <Divider my="2" />

            {countriesToShow.map((country) => (
              <Box
                key={country.name}
                fontWeight="500"
                fontSize="lg"
                as="li"
                listStyleType="none"
              >
                <Badge
                  colorScheme="gray"
                  fontSize="1rem"
                  borderRadius="4px"
                  px="10px"
                >
                  {country.name}
                </Badge>
                <span>- {country.value.toLocaleString()}</span>
              </Box>
            ))}
          </Box>
        </>
      )}
    </>
  );
};
