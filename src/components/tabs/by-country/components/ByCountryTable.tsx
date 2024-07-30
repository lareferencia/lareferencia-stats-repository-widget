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
import { ByCountryStats } from "../../../../interfaces/byCountry.interface";
import { EventLabels } from "../../../../interfaces/stadistics.interface";

import { TFunction } from "i18next";
import { processRawData } from "../../../../utils/process-raw-data";
import { DEFAULT_EVENTS_LABELS } from "../../../../config";

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
  
  const dataToCsv = () => {
    const processData = processRawData(data);
    const headers = [
      "country",
      "views",
      "downloads",
      "outlinks",
      "conversions",
      "total",
    ];
    const rows = processData.map((row) => {
      return [
        row.name,
        row.views,
        row.downloads,
        row.outlinks,
        row.conversions,
        row.value,
      ].join(",");
    });
    return [headers.join(","), ...rows].join("\n");
  };
  const handleDownloadCsv = () => {
    const csvData = dataToCsv();
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

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
            <Tr>
              <Td>
                <Button onClick={handleDownloadCsv} colorScheme="teal">
                  {t("csv-button")}
                </Button>
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Card>
  );
};
