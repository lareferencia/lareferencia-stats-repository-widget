import {
  Button,
  Card,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ByCountryStats } from "../../../interfaces/byCountry.interface";
import { EventLabels } from "../../../interfaces/stadistics.interface";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { TFunction } from "i18next";

countries.registerLocale(enLocale);

type ByCountryTableProps = {
  data: ByCountryStats;
  eventLabels: EventLabels;
  t: TFunction;
};
export const ByCountryTable = ({ data, eventLabels, t }: ByCountryTableProps) => {

  return (
    <Card padding="4" shadow="sm" borderRadius="12" mt={6}>
      <TableContainer>
        <Table variant="striped" colorScheme="gray" size="lg">
          <Thead>
            <Tr>
              <Th>{t('country')}</Th>
              {Object.keys(eventLabels).map((label, index) => (
                <Th key={index}>{eventLabels[label as keyof EventLabels]}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.country.buckets.map((country) => (
              <Tr key={country.key}>
                <Td>{countries.getName(country.key, "en") || country.key}</Td>
                {Object.keys(eventLabels).map((label, index) => (
                  <Td key={index}>
                    {country[
                      label as keyof EventLabels
                    ]?.value.toLocaleString() || 0}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
          <Tfoot display="flex" justifyContent="start" py="4">
            <Tr>
              <Td>
                <Button colorScheme="teal">{t("csv-button")}</Button>
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Card>
  );
};
