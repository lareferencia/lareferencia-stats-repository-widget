import { Filters } from "./filters";
import StackedBarChart from "./stacked-barchart/StackedBarChart";
import { DataTable } from "../table/DataTable";
import {
  EventLabels,
  ScopeLabels,
  Statistics,
} from "../../interfaces/stadistics.interface";
import { GeneralPanels } from "./general-panels/GeneralPanels";

interface GeneralTabProps {
  data: Statistics;
  scopeLabels: ScopeLabels;
  eventLabels: EventLabels;
  activeScope: string;
  setActiveScope: (scope: string) => void;
  t: any;
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
  tabIndex: number;
}

export const GeneralTab = ({
  data,
  scopeLabels,
  eventLabels,
  activeScope,
  setActiveScope,
  t,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  refresh,
  setRefresh,
  tabIndex,
}: GeneralTabProps) => {
  return (
    <>
      <GeneralPanels
        data={data}
        scopeLabels={scopeLabels}
        eventLabels={eventLabels}
        activeScope={activeScope}
        t={t}
      />
      {/* Filters */}
      <Filters
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        refresh={refresh}
        setRefresh={setRefresh}
        t={t}
        scopeLabels={scopeLabels}
        activeScope={activeScope}
        setActiveScope={setActiveScope}
      />

      {/* Stacked bar chart */}
      <StackedBarChart
        data={data}
        scopeLabels={scopeLabels}
        eventLabels={eventLabels}
        activeScope={activeScope}
        setActiveScope={setActiveScope}
        t={t}
        tabIndex={tabIndex}
      />

      {/* Data table */}
      <DataTable
        data={data}
        eventLabels={eventLabels}
        scopeLabels={scopeLabels}
        activeScope={activeScope}
        t={t}
      />
    </>
  );
};
