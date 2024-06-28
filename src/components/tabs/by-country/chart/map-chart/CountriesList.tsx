import { Badge, Box, Divider, Text } from "@chakra-ui/react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { ByCountryStats } from "../../../../../interfaces/byCountry.interface";
import { useEffect, useState } from "react";
import { getCountriesByRegionSelected } from "./utils/getCountriesByRegionSelected";
import Loading from "../../../../ui/Loading";
import { TFunction } from "i18next";

countries.registerLocale(enLocale);

type Props = {
  regionSelected: string;
  data: ByCountryStats;
  t: TFunction;
};

type CountryList = {
  name: string;
  value: number;
};

export const CountriesList = ({ regionSelected, data, t }: Props) => {
  const [countriesToShow, setCountriesToShow] = useState<CountryList[]>();

  useEffect(() => {
    const countryiesToShow = getCountriesByRegionSelected(
      regionSelected,
      data
    ).map((country) => ({
      name: countries.getName(country.key, "en") || country.key,
      value:
        country.downloads.value + country.views.value + country.outlinks.value,
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
              <Box key={country.name} fontWeight="500" fontSize="lg" as="li" listStyleType="none">
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
