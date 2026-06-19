import { Box, Button, Card } from "@chakra-ui/react";
import { TFunction } from "i18next";
import { useMemo } from "react";

type DateButtonsProps = {
  t: TFunction;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
  startDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  onPresetSelect: () => void;
  dataEndDate?: Date;
};

export const DateButtons = ({
  t,
  setRefresh,
  setStartDate,
  setEndDate,
  onPresetSelect,
  refresh,
  startDate,
  dataEndDate
}: DateButtonsProps) => {

  // Usar UTC para evitar problemas de zona horaria
  const subtractMonthsUTC = (date: Date, months: number) => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    // Restar meses y ajustar año/mes si es necesario
    let newMonth = month - months;
    let newYear = year;
    while (newMonth < 0) {
      newMonth += 12;
      newYear -= 1;
    }
    return new Date(Date.UTC(newYear, newMonth, 1));
  };

  // Los botones siempre anclan al dataEndDate del fetch inicial — nunca cambia
  // Se resta (months - 1) para que el rango incluya exactamente N meses
  // Ejemplo: "6 meses" desde mayo 2024 → dic 2023 a may 2024 = 6 meses
  const defaultDates = useMemo(() => {
    if (!dataEndDate) return [];
    return [
      { label: `6 ${t("months")}`, callback: subtractMonthsUTC(dataEndDate, 5), key: '6months' },
      { label: `1 ${t("year")}`,   callback: subtractMonthsUTC(dataEndDate, 11), key: '1year' },
      { label: `3 ${t("years")}`,  callback: subtractMonthsUTC(dataEndDate, 35), key: '3years' },
    ];
  }, [dataEndDate, t]);

  const handleSetDate = (start: Date) => {
    // Asegurar que la fecha esté en UTC
    const adjustedStart = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1));
    setStartDate(adjustedStart);
    if (dataEndDate) setEndDate(dataEndDate);
    onPresetSelect();
    setRefresh(!refresh);
  };

  const isSameRange = (selectedDate: Date, rangeDate: Date) => {
    if (!selectedDate || !rangeDate) return false;
    return selectedDate.getUTCFullYear() === rangeDate.getUTCFullYear() &&
           selectedDate.getUTCMonth() === rangeDate.getUTCMonth() &&
           selectedDate.getUTCDate() === rangeDate.getUTCDate();
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

