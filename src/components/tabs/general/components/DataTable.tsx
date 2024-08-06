import {
  Box,
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
import {
  EventLabels,
  ScopeLabels,
  Statistics,
} from "../../../../interfaces/stadistics.interface";
import { TFunction } from "i18next";
import { DEFAULT_EVENTS_LABELS, DEFAULT_SCOPES_KEYS } from "../../../../config";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  handleDownloadCsv,
  renderValues,
} from "../utils/process-data-functions";

type DataTableProps = {
  data: Statistics;
  eventLabels: EventLabels;
  scopeLabels: ScopeLabels;
  activeScope: string;
  t: TFunction;
};

export const DataTable = ({
  data,
  eventLabels,
  activeScope,
  scopeLabels,
  t,
}: DataTableProps) => {
  const [pageIndex, setPageIndex] = useState(0);

  const renderHeaderList = (labels: EventLabels | ScopeLabels) => {
    const headerList = Object.keys(labels).map((label, index) => (
      <Th key={index}>
        {" "}
        {labels[label as keyof (EventLabels | ScopeLabels)]}{" "}
      </Th>
    ));
    return headerList;
  };

  return (
    <Card padding="4" shadow="sm" borderRadius="12" mt={6}>
      <TableContainer>
        <Table variant="striped" colorScheme="gray" size="lg">
          <Thead>
            <Tr>
              <Th>{t("months")}</Th>
              {activeScope === "ALL"
                ? renderHeaderList(scopeLabels)
                : renderHeaderList(eventLabels)}
            </Tr>
          </Thead>
          <Tbody>
            {data.time.buckets
              .map((bucket, index) => (
                <Tr key={index}>
                  <Td>
                    {new Date(bucket.key_as_string).toLocaleString(
                      `${t("calendar-lang")}`,
                      { month: "short", year: "numeric" }
                    )}
                  </Td>
                  {activeScope === "ALL"
                    ? DEFAULT_SCOPES_KEYS.map((scope, index) => (
                        <Td key={index}>{renderValues(bucket, scope)}</Td>
                      ))
                    : DEFAULT_EVENTS_LABELS.map((event, index) => (
                        <Td key={index}>
                          {bucket.level.buckets
                            .find((b) => b.key === activeScope)
                            ?.[
                              event as keyof EventLabels
                            ]?.value.toLocaleString() || 0}
                        </Td>
                      ))}
                </Tr>
              ))
              .slice(10 * pageIndex, 10 * (pageIndex + 1))}
          </Tbody>
          <Tfoot display="flex" justifyContent="start" py="4">
            <Tr>
              <Td>
                <Button
                  onClick={() =>
                    handleDownloadCsv(
                      activeScope,
                      data,
                      t,
                      scopeLabels,
                      eventLabels
                    )
                  }
                  colorScheme="teal"
                >
                  {t("csv-button")}
                </Button>
              </Td>
            </Tr>
          </Tfoot>
        </Table>
        <Box display="flex" justifyContent="space-evenly">
          <Box display="flex" gap="2">
            <Button
              variant="ghost"
              onClick={() => setPageIndex(pageIndex - 1)}
              isDisabled={pageIndex === 0}
            >
              <ChevronLeftIcon fontSize="1.5rem" />
            </Button>
            <Box display="flex" gap="2" alignItems="center">
              {/* generate the page index buttons */}
              {Array.from(
                { length: Math.ceil(data.time.buckets.length / 10) },
                (_, index) => (
                  <Button
                    key={index}
                    variant={pageIndex === index ? "solid" : "outline"}
                    onClick={() => setPageIndex(index)}
                  >
                    {index + 1}
                  </Button>
                )
              )}
            </Box>

            <Button
              variant="ghost"
              onClick={() => setPageIndex(pageIndex + 1)}
              isDisabled={10 * (pageIndex + 1) >= data.time.buckets.length}
            >
              <ChevronRightIcon fontSize="1.5rem" />
            </Button>
          </Box>
        </Box>
      </TableContainer>
    </Card>
  );
};
