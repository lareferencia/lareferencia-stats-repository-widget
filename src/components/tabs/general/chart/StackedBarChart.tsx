import { useEffect, useRef } from "react";

import * as echarts from "echarts";

import { Card } from "@chakra-ui/react";
import { TFunction } from "i18next";
import { EventLabels, ScopeLabels, Statistics } from "../../../../interfaces/stadistics.interface";
import { DEFAULT_EVENTS_LABELS, DEFAULT_EVENTS_LABELS_KEYS, DEFAULT_SCOPES_KEYS } from "../../../../config";
import { setColor } from "../../../../utils";
import { processDataForScope } from "./utils/processDataForScope";


type StackedBarProps = {
  data: Statistics;
  scopeLabels: ScopeLabels;
  eventLabels: EventLabels;
  activeScope: string;
  setActiveScope: (value: string) => void;
  t: TFunction;
  tabIndex: number;
};

const scopeEvents = DEFAULT_EVENTS_LABELS;
const scopes: string[] = DEFAULT_SCOPES_KEYS;

const StackedBarChart = ({
  data,
  scopeLabels,
  eventLabels,
  activeScope,
  t,
  tabIndex,
}: StackedBarProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  console.log('datos raw en chart', data);
  
  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    if (chartRef.current) {
      const series: any[] = [];

      if (activeScope === "ALL") {
        scopes.map((scope) => {
          if (scope === "ALL") return;

          series.push({
            name: `${scopeLabels[scope as keyof ScopeLabels]}`,
            type: "bar",
            stack: "total",
            itemStyle: { color: setColor(scope, "ALL") },
            data: processDataForScope(data, scope),
          });
        });
      } else {
        const scopesAndEvents = scopeEvents.map((event) => ({
          scope: activeScope,
          event,
        }));

        scopesAndEvents.forEach((scopeAndEvent) => {
          series.push({
            name: `${scopeLabels[scopeAndEvent.scope as keyof ScopeLabels]} - ${
              eventLabels[scopeAndEvent.event as keyof EventLabels]
            }`,
            type: `${
              scopeAndEvent.event === DEFAULT_EVENTS_LABELS_KEYS.C
                ? "line"
                : "bar"
            }`,
            yAxisIndex: `${
              scopeAndEvent.event === DEFAULT_EVENTS_LABELS_KEYS.C ? 1 : 0
            }`,
            stack: `${
              scopeAndEvent.event === DEFAULT_EVENTS_LABELS_KEYS.C
                ? ""
                : "total"
            }`,
            itemStyle: {
              color: setColor(scopeAndEvent.scope, scopeAndEvent.event),
            },
            data: processDataForScope(data, scopeAndEvent),
          });
        });
      }

      console.log('datos antes del proceso del axis', data.time.buckets);
      
      const xAxisData = data.time.buckets.map((entry) => {
      const date = new Date(entry.key_as_string);
      // Usar métodos UTC explícitamente
      const month = date.toLocaleString(`${t("calendar-lang")}`, { 
        month: "short", 
        timeZone: "UTC" 
      });
      const year = date.getUTCFullYear();
      return `${month} ${year}`;
    });

    console.log('Fechas del axies luego del proceso', xAxisData);

      const maxViews = Math.max(...series[0].data);
      const maxDownloads = Math.max(...series[1].data);
      const maxOutlinks = Math.max(...series[2].data);
      const sum = maxViews + maxDownloads + maxOutlinks;

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {
          show: false,
        },
        grid: {
          left: "2%",
          top: "0%",
          right: "2%",
          bottom: "6%",
          containLabel: false,
        },
        yAxis: [
          {
            type: "value",
            max: sum,
            name: "Total Access",
            nameTextStyle: {
              fontWeight: "bold",
              fontSize: 13,
            },
            show: false,
          },
          {
            type: "value",
            max: sum,
            name: DEFAULT_EVENTS_LABELS_KEYS.C,
            nameTextStyle: {
              fontWeight: "bold",
              fontSize: 13,
            },
            show: false,
            alignTicks: false,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#6e9ef1",
              },
            },
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],

        xAxis: {
          type: "category",
          data: xAxisData,
        },
        series: series,
      };

      const handleResize = () => {
        if (myChart) myChart.resize();
      };
      window.addEventListener("resize", handleResize);

      option && myChart.setOption(option);

      return () => {
        window.removeEventListener("resize", handleResize);
        myChart.dispose();
      };
    }
  }, [activeScope, tabIndex]);

  return (
    <Card shadow="sm" borderRadius="12" p="6">
      {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
      <div id="bar-chart" ref={chartRef} style={{ height: `500px` }}></div>
    </Card>
  );
};

export default StackedBarChart;
