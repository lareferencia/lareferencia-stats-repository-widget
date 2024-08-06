import { Button, Td, Tr } from "@chakra-ui/react";
import { processRawData } from "../../../../utils/process-raw-data";
import { TFunction } from "i18next";
import { ByCountryStats } from "../../../../interfaces";

type Props = {
  t: TFunction;
  data: ByCountryStats;
};
export const CsvButton = ({ data, t }: Props) => {
  const dataToCsv = () => {
    const processData = processRawData(data);
    const headers = [
      t("country"),
      t("views"),
      t("downloads"),
      t("outlinks"),
      t("conversions"),
      t("total-events"),
    ];
    
    const rows = processData.map((row) => {
      return [
        t(row.name),
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
    <Tr>
      <Td>
        <Button onClick={handleDownloadCsv} colorScheme="teal">
          {t("csv-button")}
        </Button>
      </Td>
    </Tr>
  );
};
