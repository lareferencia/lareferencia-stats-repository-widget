import { useEffect, useState } from "react";

import { Box, Card, Grid } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

import { FaRegEye } from "react-icons/fa";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { GiClick } from "react-icons/gi";
import { IoFunnel } from "react-icons/io5";
import { MdNumbers } from "react-icons/md";

import {
  EventLabels,
  LevelBucket,
  ScopeLabels,
  Statistics,
} from "../../../interfaces/stadistics.interface";
import { DEFAULT_EVENTS_LABELS_KEYS } from "../../../config";
import { TFunction } from "i18next";

type PanelTitle = "views" | "downloads" | "outlinks" | "conversions";

type GeneralPanelsProps = {
  data: Statistics;
  scopeLabels: ScopeLabels;
  activeScope: string;
  eventLabels: EventLabels;
  t: TFunction;
};

export const GeneralPanels = ({
  data,
  eventLabels,
  activeScope,
  t,
}: GeneralPanelsProps) => {
  const [scopeData, setScopeData] = useState<LevelBucket[]>(
    data.level.buckets.filter((bucket) => bucket.key === activeScope)
  );

  useEffect(() => {
    const totalData: LevelBucket[] = [
      {
        key: "ALL",
        doc_count: 0,
        views: { value: data.views.value },
        outlinks: { value: data.outlinks.value },
        downloads: { value: data.downloads.value },
        conversions: { value: data.conversions.value },
      },
    ];
    const scopeData = data.level.buckets.filter(
      (bucket) => bucket.key === activeScope
    );
    activeScope === "ALL" ? setScopeData(totalData) : setScopeData(scopeData);
  }, [activeScope]);

  const panels = [
    {
      title: DEFAULT_EVENTS_LABELS_KEYS.V,
      label: eventLabels[DEFAULT_EVENTS_LABELS_KEYS.V as keyof EventLabels],
      value: data.views.value,
      icon: <FaRegEye />,
    },
    {
      title: DEFAULT_EVENTS_LABELS_KEYS.D,
      label: eventLabels[DEFAULT_EVENTS_LABELS_KEYS.D as keyof EventLabels],
      value: data.downloads.value,
      icon: <LiaFileDownloadSolid />,
    },
    {
      title: DEFAULT_EVENTS_LABELS_KEYS.O,
      label: eventLabels[DEFAULT_EVENTS_LABELS_KEYS.O as keyof EventLabels],
      value: data.outlinks.value,
      icon: <GiClick />,
    },
    {
      title: DEFAULT_EVENTS_LABELS_KEYS.C,
      label: eventLabels[DEFAULT_EVENTS_LABELS_KEYS.C as keyof EventLabels],
      value: data.conversions.value,
      icon: <IoFunnel />,
    },
  ];

  return (
    <div>
      {scopeData.map((bucket: LevelBucket, index) => (
        <Grid
          key={index}
          gridTemplateColumns={{
            base: "repeat(1, minmax(0px, 1fr))",
            md: "repeat(2, minmax(0px, 1fr))",
            lg: "repeat(5, minmax(0px, 1fr))",
          }}
          gap="4"
        >
          {/* Total panel */}
          <Card padding="4" shadow="sm" borderRadius="12">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid>
                <Box display="flex" gap="2">
                  <span
                    style={{
                      fontWeight: "600",
                      color: "gray",
                      fontSize: "1.1rem",
                    }}
                  >
                    Total
                  </span>
                  <Tooltip
                    label={t("tooltip-general-panel")}
                    fontSize="md"
                  >
                    <InfoIcon fontSize="12px" color="teal" />
                  </Tooltip>
                </Box>
                <span style={{ fontWeight: "700", fontSize: "1.5rem" }}>
                  {(
                    bucket.downloads.value +
                    bucket.views.value +
                    bucket.outlinks.value
                  ).toLocaleString()}
                </span>
              </Grid>
              <Card
                p="4"
                bg="gray.100"
                variant="elevated"
                shadow="xs"
                borderRadius="12"
              >
                <MdNumbers />
              </Card>
            </Box>
          </Card>

          {/* Event panels */}
          {panels.map((panel, index) => (
            <Card padding="4" shadow="sm" borderRadius="12" key={index}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid>
                  <span
                    style={{
                      fontWeight: "600",
                      color: "gray",
                      fontSize: "1.1rem",
                    }}
                  >
                    {panel.label}
                  </span>
                  <span style={{ fontWeight: "700", fontSize: "1.5rem" }}>
                    {bucket[panel.title as PanelTitle].value.toLocaleString()}
                  </span>
                </Grid>
                <Card
                  p="4"
                  bg="gray.100"
                  variant="elevated"
                  shadow="xs"
                  borderRadius="12"
                >
                  {panel.icon}
                </Card>
              </Box>
            </Card>
          ))}
        </Grid>
      ))}
    </div>
  );
};
