import { Box, Button, Card } from "@chakra-ui/react";
import { TFunction } from "i18next";

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
  const dates = [
    {
      label: `6 ${t("months")}`,
      callback: new Date(new Date().setFullYear(new Date().getMonth() - 6)),
    },
    {
      label: `1 ${t("year")}`,
      callback: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    },
    {
      label: `3 ${t("years")}`,
      callback: new Date(new Date().setFullYear(new Date().getFullYear() - 3)),
    },
  ];

  const handleSetDate = (date: Date) => {
    
    
    setStartDate(date);
    console.log(date);  
    setRefresh(!refresh);
  };
  

  return (
    <Box borderRadius="12">
      <Box display="flex" gap="2">
        {dates.map(({ label, callback }) => (
          <Card
            key={label}
            shadow="sm"
            borderRadius="12"
            p="1"
            justifyContent="center"
            rounded="lg"
          >
            <Button
              onClick={() => handleSetDate(callback)}
              size="sm"
              fontWeight="bold"
              variant={startDate === callback ? "solid" : "outline"}
            >
              {label}
            </Button>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
