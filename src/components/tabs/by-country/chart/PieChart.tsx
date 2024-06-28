import { Box, Text } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import * as echarts from "echarts";

import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import {
  ByCountryStats,
  CountryObject,
} from "../../../../interfaces/byCountry.interface";
import { TFunction } from "i18next";
import { InfoIcon } from "@chakra-ui/icons";

countries.registerLocale(enLocale);

interface PieChartProps {
  data: ByCountryStats;
  tabIndex: number;
  setCountry: (country: CountryObject) => void;
  t: TFunction;
}

export const PieChart = ({ data, tabIndex, setCountry, t }: PieChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    if (chartRef.current) {
      const pieData = data.country.buckets.map((country) => {
        const countryData = {
          name: countries.getName(country.key, "en") || country.key,
          value:
            country.downloads.value +
            country.views.value +
            country.outlinks.value,
          views: country.views.value,
          downloads: country.downloads.value,
          outlinks: country.outlinks.value,
          conversions: country.conversions.value,
        };
        return countryData;
      });

      const filteredPieData = pieData.filter(
        (country) => country.name !== "xx"
      );
      setCountry(filteredPieData[0]);

      const option = {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: t("pie-chart-title"),
            type: "pie",
            radius: ["45%", "90%"],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 10,
            },
            label: {
              show: true,
              fontWeight: "600",
              color: "#395182",
              fontSize: 13,
            },
            emphasis: {
              label: {
                show: true,
                fontWeight: "bold",
                fontSize: 16,
              },
            },
            data: filteredPieData,
          },
        ],
      };

      const handleResize = () => {
        if (myChart) myChart.resize();
      };
      window.addEventListener("resize", handleResize);

      option && myChart.setOption(option);
      setEventHandlers(myChart);

      return () => {
        window.removeEventListener("resize", handleResize);
        myChart.dispose();
      };
    }
  }, [tabIndex]);

  const setEventHandlers = (myChart: echarts.EChartsType) => {
    myChart.on("mouseover", (event) => {
      setCountry(event.data as CountryObject);
    });
  };

  return (
    <Box mt={10} pos="relative">
      <Box id="pie-chart" ref={chartRef} height="450px"></Box>
      <Box pos="absolute" top="0" boxShadow="md" p="4" borderRadius="8px">
        <Box display="flex" alignItems="center" gap="4">
          <Text as="span" fontWeight="600" color="gray" fontSize="1.1rem">
            Otros países
          </Text>
          <Tooltip label={t("tooltip-others-countries")} fontSize="md">
            <InfoIcon fontSize="12px" color="teal" />
          </Tooltip>
        </Box>
        <Box>
          <Text
            as="span"
            fontWeight="700"
            fontSize="1.1rem"
            overflow="hidden"
            whiteSpace="nowrap"
            isTruncated
          >
            123.300
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
