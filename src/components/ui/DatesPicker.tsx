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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refresh, startDateValue, endDateValue]);

  const handleClickOutside = (event: any) => {
    if (startDateRef.current && !startDateRef.current.contains(event.target)) {
      setIsStartDateBoxVisible(false);
    }
    if (endDateRef.current && !endDateRef.current.contains(event.target)) {
      setIsEndDateBoxVisible(false);
    }
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
    if (startDateValue.year >= endDateValue.year) {
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
    if (endDateValue.year === new Date().getFullYear()) return;

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
          w="150px"
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
                    startDateValue.year === endDateValue.year &&
                    month.id > endDateValue.month
                  }
                  onClick={() => handleSelectStartDate(month.id)}
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
          w="150px"
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
                    endDateValue.year === startDateValue.year &&
                    month.id < startDateValue.month
                  }
                  onClick={() => handleSelectEndDate(month.id)}
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
