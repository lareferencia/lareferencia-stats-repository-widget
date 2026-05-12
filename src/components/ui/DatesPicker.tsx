import { Box, Button, Text } from "@chakra-ui/react";
import { useState, useRef, useEffect, useContext } from "react";
import { TFunction } from "i18next";
import { FaSyncAlt } from "react-icons/fa";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { ShadowRootContext } from "../../main";

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
  maxSelectableDate?: Date;
  onDateRangeConfirm: (start: Date, end: Date) => void;
  refresh: boolean;
  setRefresh: (r: boolean) => void;
  t: TFunction;
};

export const DatesPicker = (props: DatesPickerProps) => {
  // refresh/setRefresh are received but not used — DatesPicker delegates to onDateRangeConfirm
  const { refresh: _unused_refresh, setRefresh: _unused_setRefresh, maxSelectableDate, onDateRangeConfirm, t } = props;
  // Silence unused var warnings — these props are part of the contract but handled externally
  void _unused_refresh;
  void _unused_setRefresh;

  const [isStartDateBoxVisible, setIsStartDateBoxVisible] = useState(false);
  const [isEndDateBoxVisible, setIsEndDateBoxVisible] = useState(false);
  const [endDateError, setEndDateError] = useState<string>("");

  const maxDate = maxSelectableDate ?? new Date();
  const maxYear = maxDate.getFullYear();
  const maxMonth = maxDate.getMonth() + 1;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [pickerStart, setPickerStart] = useState<{ year: number; month: number } | null>(null);
  const [pickerEnd, setPickerEnd] = useState<{ year: number; month: number } | null>(null);

  // Calendar navigation year: use maxSelectableDate year when available, otherwise current year
  const calendarBaseYear = maxSelectableDate ? maxDate.getFullYear() : currentYear;

  const startDateRef = useRef<HTMLDivElement | null>(null);
  const endDateRef = useRef<HTMLDivElement | null>(null);
  const shadowContainer = useContext(ShadowRootContext);

  useEffect(() => {
    if (!shadowContainer) return;

    const handleClick = (e: MouseEvent) => handleClickOutside(e);

    shadowContainer.addEventListener("mousedown", handleClick);
    return () => {
      shadowContainer.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
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

    setTimeout(() => {
      if (type === "start") {
        setIsStartDateBoxVisible(false);
      } else {
        setIsEndDateBoxVisible(false);
      }
    }, 100);
  };

  const handleSelectStartDate = (month: number) => {
    if (pickerStart === null) return;
    setPickerStart({ ...pickerStart, month });
    setIsStartDateBoxVisible(false);
  };

  const handleSelectEndDate = (month: number) => {
    if (pickerEnd === null) return;
    const lastDay = new Date(pickerEnd.year, month - 1, 0).getDate();
    const newEndDate = new Date(pickerEnd.year, month - 1, lastDay);

    const startForValidation = pickerStart
      ? new Date(pickerStart.year, pickerStart.month - 1, 1)
      : new Date(0);

    if (newEndDate < startForValidation) {
      setEndDateError(t("error_end_before_start") || "End date cannot be before start date");
      return;
    }

    setEndDateError("");
    setPickerEnd({ ...pickerEnd, month });
    setIsEndDateBoxVisible(false);
  };

  const subtractStartDateYear = () => {
    if (pickerStart === null) return;
    setPickerStart({ ...pickerStart, year: pickerStart.year - 1 });
  };

  const addStartDateYear = () => {
    if (pickerStart === null) return;
    if (pickerStart.year >= currentYear || pickerStart.year >= (pickerEnd?.year ?? pickerStart.year)) return;
    setPickerStart({ ...pickerStart, year: pickerStart.year + 1 });
  };

  const subtractEndDateYear = () => {
    if (pickerEnd === null) return;
    if (pickerEnd.year <= (pickerStart?.year ?? calendarBaseYear)) return;
    setPickerEnd({ ...pickerEnd, year: pickerEnd.year - 1 });
  };

  const addEndDateYear = () => {
    if (pickerEnd === null) return;
    if (pickerEnd.year >= maxYear) return;
    setPickerEnd({ ...pickerEnd, year: pickerEnd.year + 1 });
  };

  const canConfirm = pickerStart !== null && pickerEnd !== null;

  const handleRefreshClick = () => {
    if (pickerStart === null || pickerEnd === null) return;
    const startDate = new Date(pickerStart.year, pickerStart.month - 1, 1);
    const lastDay = new Date(pickerEnd.year, pickerEnd.month - 1, 0).getDate();
    const endDate = new Date(pickerEnd.year, pickerEnd.month - 1, lastDay);
    onDateRangeConfirm(startDate, endDate);
  };

  // Derive display state for start and end
  const startDisplay = pickerStart !== null
    ? `${t(months[pickerStart.month - 1].name)} - ${pickerStart.year}`
    : t("select_interval");

  const endDisplay = pickerEnd !== null
    ? `${t(months[pickerEnd.month - 1].name)} - ${pickerEnd.year}`
    : t("select_interval");

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
          onClick={() => {
            if (pickerStart === null) {
              setPickerStart({ year: calendarBaseYear, month: 1 });
            }
            setIsStartDateBoxVisible(true);
          }}
        >
          {startDisplay}
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
                {pickerStart?.year ?? calendarBaseYear}
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
                    (pickerStart?.year === maxYear && month.id > maxMonth) ||
                    (pickerStart?.year === pickerEnd?.year && month.id > (pickerEnd?.month ?? 12))
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
          onClick={() => {
            if (pickerEnd === null) {
              setPickerEnd({ year: calendarBaseYear, month: currentMonth });
            }
            setIsEndDateBoxVisible(true);
          }}
        >
          {endDisplay}
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
                {pickerEnd?.year ?? calendarBaseYear}
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
                    (pickerEnd?.year === maxYear && month.id > maxMonth) ||
                    (pickerEnd?.year === pickerStart?.year && month.id < (pickerStart?.month ?? 1))
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
        {endDateError && (
          <Text color="red.500" fontSize="xs" position="absolute" top="12" right="0">
            {endDateError}
          </Text>
        )}
      </Box>

      <Button
        variant="ghost"
        onClick={handleRefreshClick}
        aria-label={canConfirm ? t("confirm_date_range") : t("select_interval")}
        title={canConfirm ? t("confirm_date_range") : t("select_interval")}
      >
        <FaSyncAlt size="1.1rem" color={canConfirm ? "teal" : "gray"} />
      </Button>
    </Box>
  );
};
