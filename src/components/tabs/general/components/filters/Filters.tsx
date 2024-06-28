import { Box } from "@chakra-ui/react";
import { DatesPicker } from "./DatesPicker";
import { DateButtons } from "./DateButtons";
import { LevelSelector } from "./LevelSelector";
import {
  ScopeLabels,
} from "../../../../../interfaces/stadistics.interface";

interface FiltersProps {
  scopeLabels: ScopeLabels;
  activeScope: string;
  setActiveScope: (scope: string) => void;
  t: any;
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}

export const Filters = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  refresh,
  setRefresh,
  t,
  scopeLabels,
  activeScope,
  setActiveScope,
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
          <DatesPicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            refresh={refresh}
            setRefresh={setRefresh}
            t={t}
          />
        </Box>
        {/* Buttons 1y, 3y, 5y TODO: Work on this */}
        <DateButtons t={t} />
      </Box>
    </Box>
  );
};