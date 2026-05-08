import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import * as echarts from "echarts";

import { ByCountryStats } from "../../../../interfaces/byCountry.interface";
import { ProcessedData } from "../../../../interfaces/processed-data.interface";

import { TFunction } from "i18next";
import { processRawData } from "../../../../utils/process-raw-data";

interface PieChartProps {
  data: ByCountryStats;
  tabIndex: number;
  setCountry: (country: ProcessedData | undefined) => void;
  t: TFunction;
}

const PieChart = ({ data, tabIndex, setCountry, t }: PieChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current!);

    if (chartRef.current) {
      const pieData = processRawData(data).filter(
        (country) => country.name !== "xx"
      );
      if (pieData.length === 0) return;
      setCountry(pieData[0]);

      const pieDataWithFullNames = pieData.map((country) => {
        return {
          ...country,
          name: country.name
        };
      });
      

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
            data: pieDataWithFullNames,
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
  }, [tabIndex, data, t, setCountry]);

  const setEventHandlers = (myChart: echarts.EChartsType) => {
    myChart.on("mouseover", (event) => {
      setCountry(event.data as any);
    });
  };

  return (
    <Box my={10}>
      <Box id="pie-chart" ref={chartRef} height="450px"></Box>
    </Box>
  );
};

export default PieChart;