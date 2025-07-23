import { Box, Button, Text } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { TFunction } from "i18next";
import { FaSyncAlt } from "react-icons/fa";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const months = [
  { id: 1, name: "january" },
  { id: 2, name: "february" },
  { id: 3, name: "march" },
  { id: 4, name: "april" },
  { id: 5, name: "may" },
  { id: 6, name: "june" },
  { id: 7, name: "july" },
  { id: 8, name: "august" },
  { id: 9, name: "september" },
  { id: 10, name: "october" },
  { id: 11, name: "november" },
  { id: 12, name: "december" },
];

type DatesPickerProps = {
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
  t: TFunction;
};

export const DatesPicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  refresh,
  setRefresh,
  t,
}: DatesPickerProps) => {
  const [isStartDateBoxVisible, setIsStartDateBoxVisible] = useState(false);
  const [isEndDateBoxVisible, setIsEndDateBoxVisible] = useState(false);

   // Obtener la fecha actual
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // +1 porque los meses van de 0 a 11


  const [startDateValue, setStartDateValue] = useState({
    year: startDate.getFullYear(),
    month: startDate.getMonth() + 1,
  });
  const [endDateValue, setEndDateValue] = useState({
    year: endDate.getFullYear(),
    month: endDate.getMonth() + 1,
  });

  const startDateRef = useRef<any>(null);
  const endDateRef = useRef<any>(null);

  useEffect(() => {
    const shadowRoot = document.getElementById("lrhw-widget")?.shadowRoot;
    const rootElement = shadowRoot?.firstChild as HTMLElement;

    const handleClick = (e: MouseEvent) => handleClickOutside(e);

    rootElement?.addEventListener("mousedown", handleClick);
    return () => {
      rootElement?.removeEventListener("mousedown", handleClick);
    };
  }, [refresh, startDateValue, endDateValue]);

  const handleClickOutside = (event: MouseEvent) => {
    // Verificar si el clic fue dentro del contenedor del date picker
    const isStartPickerClick = startDateRef.current?.contains(
      event.target as Node
    );
    const isEndPickerClick = endDateRef.current?.contains(event.target as Node);

    if (!isStartPickerClick) {
      setIsStartDateBoxVisible(false);
    }

    if (!isEndPickerClick) {
      setIsEndDateBoxVisible(false);
    }
  };

  const handleMonthClick = (type: "start" | "end", monthId: number) => {
    if (type === "start") {
      handleSelectStartDate(monthId);
    } else {
      handleSelectEndDate(monthId);
    }

    // Cerrar el selector después de un pequeño retraso
    setTimeout(() => {
      if (type === "start") {
        setIsStartDateBoxVisible(false);
      } else {
        setIsEndDateBoxVisible(false);
      }
    }, 100);
  };

  const handleSelectStartDate = (month: number) => {
    const newStartDateValue = {
      ...startDateValue,
      month: month,
    };

    setStartDateValue(newStartDateValue);

    const year = startDateValue.year;

    const newStartDate = new Date(year, month - 1, 1);

    setStartDate(newStartDate);
    setIsStartDateBoxVisible(false);
  };

  const handleSelectEndDate = (month: number) => {
    const newEndDateValue = {
      ...endDateValue,
      month: month,
    };
    setEndDateValue(newEndDateValue);
    const year = endDateValue.year;
    const newEndDate = new Date(year, month - 1, 30);
    setEndDate(newEndDate);
    setIsEndDateBoxVisible(false);
  };

  const subtractStartDateYear = () => {
    const newStartDateValue = {
      ...startDateValue,
      year: startDateValue.year - 1,
    };
    setStartDateValue(newStartDateValue);
  };

  const addStartDateYear = () => {
  // No permitir años mayores al año actual
  if (startDateValue.year >= currentYear || startDateValue.year >= endDateValue.year) {
    return;
  }
  const newStartDateValue = {
    ...startDateValue,
    year: startDateValue.year + 1,
  };
  setStartDateValue(newStartDateValue);
};

  const subtractEndDateYear = () => {
    if (endDateValue.year <= startDateValue.year) return;

    const newEndDateValue = {
      ...endDateValue,
      year: endDateValue.year - 1,
    };
    setEndDateValue(newEndDateValue);
  };

  const addEndDateYear = () => {
  // No permitir años mayores al año actual
  if (endDateValue.year >= currentYear) return;

  const newEndDateValue = {
    ...endDateValue,
    year: endDateValue.year + 1,
  };
  setEndDateValue(newEndDateValue);
};

  return (
    <Box display="flex" gap="1.5">
      <Box position="relative" display="flex" ref={startDateRef}>
        <Button
          variant="outline"
          textAlign="center"
          fontWeight="500"
          as="span"
          w="200px"
          p="2"
          cursor="pointer"
          onClick={() => setIsStartDateBoxVisible(true)}
        >
          {t(months[startDateValue.month - 1].name)} - {startDateValue.year}
        </Button>

        {isStartDateBoxVisible && (
          <Box
            borderRadius="10px"
            width="320px"
            height="220px"
            position="absolute"
            top="12"
            backgroundColor="white"
            border="1px solid #eae2e2"
            zIndex="10"
          >
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              p="1"
            >
              <Button
                variant="ghost"
                leftIcon={<ArrowBackIcon />}
                onClick={() => subtractStartDateYear()}
              ></Button>
              <Text as="span" fontWeight="bold">
                {startDateValue.year}
              </Text>
              <Button
                variant="ghost"
                leftIcon={<ArrowForwardIcon />}
                onClick={() => addStartDateYear()}
              ></Button>
            </Box>

            <Box display="flex" flexWrap="wrap" justifyContent="center" gap="2">
              {months.map((month) => (
  <Button
    isDisabled={
      // Deshabilitar si es mayor al mes actual (mismo año)
      (startDateValue.year === currentYear && month.id > currentMonth) ||
      // O si es mayor al mes de fin (mismo año)
      (startDateValue.year === endDateValue.year && month.id > endDateValue.month)
    }
    onClick={() => handleMonthClick("start", month.id)}
    w={"30%"}
    key={month.id}
    size="sm"
    variant="outline"
  >
    {t(month.name)}
  </Button>
))}
            </Box>
          </Box>
        )}
      </Box>

      <Box position="relative" display="flex" ref={endDateRef}>
        <Button
          variant="outline"
          textAlign="center"
          fontWeight="500"
          as="span"
          w="200px"
          p="2"
          cursor="pointer"
          onClick={() => setIsEndDateBoxVisible(true)}
        >
          {t(months[endDateValue.month - 1].name)} - {endDateValue.year}
        </Button>
        {isEndDateBoxVisible && (
          <Box
            borderRadius="10px"
            width="320px"
            height="220px"
            position="absolute"
            top="12"
            backgroundColor="white"
            border="1px solid #eae2e2"
            zIndex="10"
          >
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              p="1"
            >
              <Button
                variant="ghost"
                leftIcon={<ArrowBackIcon />}
                onClick={() => subtractEndDateYear()}
              ></Button>
              <Text as="span" fontWeight="bold">
                {endDateValue.year}
              </Text>
              <Button
                variant="ghost"
                leftIcon={<ArrowForwardIcon />}
                onClick={() => addEndDateYear()}
              ></Button>
            </Box>

            <Box display="flex" flexWrap="wrap" justifyContent="center" gap="2">
              {months.map((month) => (
  <Button
    isDisabled={
      // Deshabilitar si es mayor al mes actual (mismo año)
      (endDateValue.year === currentYear && month.id > currentMonth) ||
      // O si es menor al mes de inicio (mismo año)
      (endDateValue.year === startDateValue.year && month.id < startDateValue.month)
    }
    onClick={() => handleMonthClick("end", month.id)}
    w={"30%"}
    key={month.id}
    size="sm"
    variant="outline"
  >
    {t(month.name)}
  </Button>
))}
            </Box>
          </Box>
        )}
      </Box>

      <Button variant="ghost" onClick={() => setRefresh(!refresh)}>
        <FaSyncAlt size="1.1rem" color="teal" />
      </Button>
    </Box>
  );
};
