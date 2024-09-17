import { TFunction } from "i18next";
import * as echarts from "echarts";

import { Box, GridItem } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
// import { GeoJson } from "../../../../../interfaces/geo-json.interface";
import { regionLayout } from "./utils/regionMapPosition";
import { ProcessedData } from "../../../../../interfaces";

import Africa from '../../../../../assets/africa.json';
import Asia from '../../../../../assets/asia.json';
import Europe from '../../../../../assets/europe.json';
import NorthAmerica from '../../../../../assets/northamerica.json';
import Oceania from '../../../../../assets/oceania.json';
import SouthAmerica from '../../../../../assets/southamerica.json';


type Props = {
  processedData: ProcessedData[];
  t: TFunction;
  regionSelected: string;
};

export const MapChart = ({ processedData, regionSelected, t }: Props) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // const fetchGeoJson = async (regionSelected: string) => {
  //   try {
  //     const response = await fetch(`/assets/${regionSelected}.json`);

  //     const geojson = await response.json();

  //     return geojson;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    if (chartRef.current) {

      const geoJsonMap = {
        "africa": Africa,
        "asia": Asia,
        "europe": Europe,
        "northamerica": NorthAmerica,
        "oceania": Oceania,
        "southamerica": SouthAmerica,
      }

      myChart.showLoading();

      
          const geojson = geoJsonMap[regionSelected as keyof typeof geoJsonMap];
          
          const showCountries = processedData.map((country) => {
            let countryName = country.name
            if (countryName.toLowerCase() === "people's republic of china") {
              countryName = "China";
            }
            return {
              name: countryName,
              value: country.downloads + country.views + country.outlinks,
            };
          });

          const maxValue = Math.max(
            ...showCountries.map((country) => country.value)
          );

          myChart.hideLoading();

          echarts.registerMap(regionSelected, geojson as any);

          const scaleLimit =
            regionLayout[regionSelected as keyof typeof regionLayout]
              .scaleLimit;
          const boundingCoords =
            regionLayout[regionSelected as keyof typeof regionLayout]
              .boundingCoords;
          const top =
            regionLayout[regionSelected as keyof typeof regionLayout].top || 0;
          const left =
            regionLayout[regionSelected as keyof typeof regionLayout].left || 0;
          const right =
            regionLayout[regionSelected as keyof typeof regionLayout].right ||
            0;
          const bottom =
            regionLayout[regionSelected as keyof typeof regionLayout].bottom ||
            0;

          const option = {
            title: {
              text: t(regionSelected),
              subtext: t("total-events-of-the-country"),
              left: "right",
            },
            scaleLimit,
            tooltip: {
              trigger: "item",
              showDelay: 0,
              transitionDuration: 0.2,
            },
            boundingCoords,
            top,
            left,
            right,
            bottom,
            visualMap: {
              left: "right",
              min: 0,
              max: maxValue,
              inRange: {
                color: [
                  "#62ccca",
                  "#48c4c1",
                  "#39b1ae",
                  "#319795",
                  "#297d7c",
                  "#206462",
                  "#1c5756",
                  "#184a49",
                  "#143d3c",
                ],
              },
              text: ["High", "Low"],
              calculable: true,
            },
            toolbox: {
              show: true,
              left: "left",
              top: "top",
              feature: {
                restore: {},
                saveAsImage: {},
              },
            },
            series: [
              {
                name: regionSelected,
                type: "map",
                roam: false,
                map: regionSelected,
                emphasis: {
                  label: {
                    show: true,
                  },
                },
                data: showCountries,
              },
            ],
          };

          myChart.setOption(option);

          option && myChart.setOption(option);
    }
  }, [regionSelected]);

  return (
    <GridItem w="100%" colSpan={4}>
      <Box id="map-chart" ref={chartRef} height="450px"></Box>
    </GridItem>
  );
};
