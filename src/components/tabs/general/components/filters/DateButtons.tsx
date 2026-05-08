import { Box, Button, Card } from "@chakra-ui/react";
import { TFunction } from "i18next";
import { useEffect, useState, useRef } from "react";

type DateButtonsProps = {
  t: TFunction;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
};

export const DateButtons = ({
  t,
  setRefresh,
  setStartDate,
  refresh,
  startDate,
  endDate
}: DateButtonsProps) => {
  const [defaultDates, setDefaultDates] = useState<
    Array<{ label: string; callback: Date; key: string }>
  >([]);

  // Función para restar meses exactos y forzar día 1
  const subtractMonthsDayOne = (date: Date, months: number) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - months);
    newDate.setDate(1);
    return newDate;
  };

  // Inicialización de fechas
  const isInitialMount = useRef(true);
  useEffect(() => {
    const anchorDate = endDate;
    const initialDates = [
      {
        label: `6 ${t("months")}`,
        callback: subtractMonthsDayOne(anchorDate, 6),
        key: '6months'
      },
      {
        label: `1 ${t("year")}`,
        callback: subtractMonthsDayOne(anchorDate, 12),
        key: '1year'
      },
      {
        label: `3 ${t("years")}`,
        callback: subtractMonthsDayOne(anchorDate, 36),
        key: '3years'
      },
    ];

    setDefaultDates(initialDates);

    if (isInitialMount.current && !startDate) {
      setStartDate(initialDates[0].callback);
      isInitialMount.current = false;
    }

  }, [t, endDate, startDate, setStartDate]);

  const handleSetDate = (date: Date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setDate(1); // Always day 1
    setStartDate(adjustedDate);
    setRefresh(!refresh);
  };

  // Comparación exacta de fechas
  const isSameRange = (selectedDate: Date, rangeDate: Date) => {
    if (!selectedDate || !rangeDate) return false;

    return selectedDate.getFullYear() === rangeDate.getFullYear() &&
           selectedDate.getMonth() === rangeDate.getMonth() &&
           selectedDate.getDate() === rangeDate.getDate();
  };

  return (
    <Box borderRadius="12">
      <Box display="flex" gap="2">
        {defaultDates.map(({ label, callback, key }) => (
          <Card
            key={key}
            shadow="sm"
            borderRadius="12"
            justifyContent="center"
            rounded="lg"
          >
            <Button
              onClick={() => handleSetDate(callback)}
              size="sm"
              border='none'
              fontWeight="bold"
              variant={isSameRange(startDate, callback) ? "solid" : "outline"}
              colorScheme={isSameRange(startDate, callback) ? "teal" : undefined}
              bg={isSameRange(startDate, callback) ? "teal.500" : undefined}
              color={isSameRange(startDate, callback) ? "white" : undefined}
              _hover={{
                bg: isSameRange(startDate, callback) ? "teal.600" : "gray.100"
              }}
            >
              {label}
            </Button>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
