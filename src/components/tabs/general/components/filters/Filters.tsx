import { Box } from "@chakra-ui/react";
import { DateButtons } from "./DateButtons";
import { LevelSelector } from "./LevelSelector";
import { ScopeLabels } from "../../../../../interfaces/stadistics.interface";
import { TFunction } from "i18next";

interface FiltersProps {
  scopeLabels: ScopeLabels;
  activeScope: string;
  setActiveScope: (scope: string) => void;
  t: TFunction;
  setRefresh: (refresh: boolean) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  onPresetSelect: () => void;
  refresh: boolean;
  startDate: Date;
  dataEndDate?: Date;
}

export const Filters = ({
  t,
  scopeLabels,
  activeScope,
  setActiveScope,
  setStartDate,
  setEndDate,
  onPresetSelect,
  setRefresh,
  refresh,
  startDate,
  dataEndDate
}: FiltersProps) => {
  return (
    <Box my="6">
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <LevelSelector
            scopeLabels={scopeLabels}
            activeScope={activeScope}
            setActiveScope={setActiveScope}
          />
        </Box>
        <DateButtons
          t={t}
          setRefresh={setRefresh}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          onPresetSelect={onPresetSelect}
          refresh={refresh}
          startDate={startDate}
          dataEndDate={dataEndDate}
        />
      </Box>
    </Box>
  );
};

