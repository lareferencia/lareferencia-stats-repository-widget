import {
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
import { ByCountryStats } from "../../../../interfaces/byCountry.interface";
import { EventLabels } from "../../../../interfaces/stadistics.interface";

import { TFunction } from "i18next";
import { processRawData } from "../../../../utils/process-raw-data";
import { DEFAULT_EVENTS_LABELS } from "../../../../config";
import { CsvButton } from "./CsvButton";

type ByCountryTableProps = {
  data: ByCountryStats;
  eventLabels: EventLabels;
  t: TFunction;
};
export const ByCountryTable = ({
  data,
  eventLabels,
  t,
}: ByCountryTableProps) => {
  return (
    <Card padding="4" shadow="sm" borderRadius="12" mt={6}>
      <TableContainer>
        <Table variant="striped" colorScheme="gray" size="lg">
          <Thead>
            <Tr>
              <Th>{t("country")}</Th>
              {Object.keys(eventLabels).map((label, index) => (
                <Th key={index}>{eventLabels[label as keyof EventLabels]}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {processRawData(data).map((country) => (
              <Tr key={country.name}>
                <Td>{country.name}</Td>
                {DEFAULT_EVENTS_LABELS.map((label, index) => (
                  <Td key={index}>
                    {country[label as keyof EventLabels]?.toLocaleString() || 0}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
          <Tfoot display="flex" justifyContent="start" py="4">
            <CsvButton data={data} t={t} />
          </Tfoot>
        </Table>
      </TableContainer>
    </Card>
  );
};
