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
  tabIndex: number;
}

const GeneralTab = ({
  data,
  scopeLabels,
  eventLabels,
  activeScope,
  setActiveScope,
  t,
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