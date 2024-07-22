import React, { Suspense, useState } from "react";
import { TFunction } from "i18next";

import { Box, TabPanel, TabPanels } from "@chakra-ui/react";
import { Tabs, TabList, Tab } from "@chakra-ui/react";

const GeneralTab = React.lazy(() => import("./general/GeneralTab"));
const ByCountryTab = React.lazy(() => import("./by-country/ByCountryTab"));

import {
  EventLabels,
  ScopeLabels,
  Statistics,
} from "../../interfaces/stadistics.interface";

import Loading from "../ui/Loading";
import { Repository } from "../../interfaces/repository.interface";

// Types definition of the props passed to the component ChartsContainer
type TabsContainerProps = {
  data: Statistics;
  scopeLabels: ScopeLabels;
  eventLabels: EventLabels;
  t: TFunction;
  selectedRepository: Repository;
  startDate: Date;
  endDate: Date ;
  setRefresh: (refresh: boolean) => void;
  setStartDate: (date: Date) => void;
  refresh: boolean;
};

const TabsContainer = ({
  data,
  scopeLabels,
  eventLabels,
  t,
  selectedRepository,
  startDate,
  endDate,
  setRefresh,
  setStartDate,
  refresh
}: TabsContainerProps) => {
  // State to manage the active scope level, Default value is 'ALL'
  const [activeScope, setActiveScope] = useState("ALL");
  const [isByCountryLoaded, setIsByCountryLoaded] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabIndexChange = (index: number) => {
    if (index === 1) {
      setIsByCountryLoaded(true);
    }
    setTabIndex(index);
  };
  
  return (
    <>
      {/* General and by country TABS */}
      <Tabs colorScheme="teal" onChange={handleTabIndexChange}>
        <TabList mb={6} display="flex" justifyContent="space-between">
          <Box display="flex">
            <Tab
              color="gray.600"
              fontWeight={`${tabIndex === 0 ? "bold" : "500"}`}
            >
              {t("general")}
            </Tab>
            <Tab
              color="gray.600"
              fontWeight={`${tabIndex === 1 ? "bold" : "500"}`}
            >
              {t("byCountry")}
            </Tab>
            <Tab
              color="gray.600"
              fontWeight={`${tabIndex === 2 ? "bold" : "500"}`}
            >
              {t("help")}
            </Tab>
          </Box>
        </TabList>
        <TabPanels>
          {/* General tab */}
          {/* Dashboard data header */}
          <TabPanel>
            <GeneralTab
              data={data}
              scopeLabels={scopeLabels}
              eventLabels={eventLabels}
              activeScope={activeScope}
              setActiveScope={setActiveScope}
              t={t}
              tabIndex={tabIndex}
              setStartDate={setStartDate}
              setRefresh={setRefresh}
              refresh={refresh}
              startDate={startDate}
            />
          </TabPanel>

          {/* By country tab */}
          <TabPanel>
            {isByCountryLoaded ? (
              <Suspense fallback={<Loading />}>
                <ByCountryTab
                startDate={startDate}
                endDate={endDate}
                  tabIndex={tabIndex}
                  eventLabels={eventLabels}
                  t={t}
                  selectedRepository={selectedRepository}
                />
              </Suspense>
            ) : (
              <Box>Click the tab to load content</Box>
            )}
          </TabPanel>

          {/* Help tab */}
          <TabPanel>
            <Box>TO-DO: Agregar imagenes de ayuda luego</Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default TabsContainer;
