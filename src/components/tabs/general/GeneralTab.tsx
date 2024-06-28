import { EventLabels, ScopeLabels, Statistics } from "../../../interfaces/stadistics.interface";
import StackedBarChart from "./chart/StackedBarChart";
import { DataTable, GeneralPanels } from "./components";
import { Filters } from "./components/filters";


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

const GeneralTab = ({
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

export default GeneralTab;