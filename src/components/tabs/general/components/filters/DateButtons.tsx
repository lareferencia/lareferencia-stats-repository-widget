import { Box, Button, Card } from "@chakra-ui/react";
import { TFunction } from "i18next";
import { useEffect, useState } from "react";

type DateButtonsProps = {
  t: TFunction;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
  startDate: Date;
  setStartDate: (date: Date) => void;
};

export const DateButtons = ({
  t,
  setRefresh,
  setStartDate,
  refresh,
  startDate
}: DateButtonsProps) => {
  const [defaultDates, setDefaultDates] = useState<Array<{
    label: string;
    callback: Date;
    key: string; // Identificador único para cada opción
  }>>([]);

  // Inicialización de fechas
  useEffect(() => {
    const now = new Date();
    const initialDates = [
      {
        label: `6 ${t("months")}`,
        callback: new Date(new Date(now).setMonth(now.getMonth() - 6)),
        key: '6months'
      },
      {
        label: `1 ${t("year")}`,
        callback: new Date(new Date(now).setFullYear(now.getFullYear() - 1)),
        key: '1year'
      },
      {
        label: `3 ${t("years")}`,
        callback: new Date(new Date(now).setFullYear(now.getFullYear() - 3)),
        key: '3years'
      },
    ];
    
    setDefaultDates(initialDates);

    // Establecer fecha inicial solo si no hay una startDate definida
    if (!startDate) {
      setStartDate(initialDates[0].callback);
    }
  }, [t]);

  const handleSetDate = (date: Date) => {
    setStartDate(date);
    setRefresh(!refresh);
  };

  // Función optimizada para comparar rangos de fechas
  const isSameRange = (selectedDate: Date, rangeDate: Date) => {
    if (!selectedDate || !rangeDate) return false;
    
    // Comparar la diferencia en meses
    const monthDiff = (d1: Date, d2: Date) => {
      return (d1.getFullYear() - d2.getFullYear()) * 12 + (d1.getMonth() - d2.getMonth());
    };
    
    const diff = monthDiff(new Date(), selectedDate);
    
    if (Math.abs(diff) === 6) return rangeDate.getTime() === defaultDates[0]?.callback.getTime();
    if (Math.abs(diff) === 12) return rangeDate.getTime() === defaultDates[1]?.callback.getTime();
    if (Math.abs(diff) === 36) return rangeDate.getTime() === defaultDates[2]?.callback.getTime();
    
    return false;
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