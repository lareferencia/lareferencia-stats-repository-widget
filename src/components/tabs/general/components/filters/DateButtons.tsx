import { Box, Button, Card } from "@chakra-ui/react";
import { TFunction } from "i18next";
import { useMemo } from "react";
import { subMonths, startOfMonth } from "date-fns";

type DateButtonsProps = {
  t: TFunction;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
  startDate: Date;
  setStartDate: (date: Date) => void;
  dataEndDate?: Date;
};

export const DateButtons = ({
  t,
  setRefresh,
  setStartDate,
  refresh,
  startDate,
  dataEndDate
}: DateButtonsProps) => {

  const subtractMonthsDayOne = (date: Date, months: number) => {
    return startOfMonth(subMonths(date, months));
  };

  // Los botones siempre anclan al dataEndDate del fetch inicial — nunca cambia
  const defaultDates = useMemo(() => {
    if (!dataEndDate) return [];
    return [
      { label: `6 ${t("months")}`, callback: subtractMonthsDayOne(dataEndDate, 6), key: '6months' },
      { label: `1 ${t("year")}`,   callback: subtractMonthsDayOne(dataEndDate, 12), key: '1year' },
      { label: `3 ${t("years")}`,  callback: subtractMonthsDayOne(dataEndDate, 36), key: '3years' },
    ];
  }, [dataEndDate, t]);

  const handleSetDate = (date: Date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setDate(1);
    setStartDate(adjustedDate);
    setRefresh(!refresh);
  };

  const isSameRange = (selectedDate: Date, rangeDate: Date) => {
    if (!selectedDate || !rangeDate) return false;
    return selectedDate.getFullYear() === rangeDate.getFullYear() &&
           selectedDate.getMonth() === rangeDate.getMonth() &&
           selectedDate.getDate() === rangeDate.getDate();
  };

  if (defaultDates.length === 0) return null;

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

