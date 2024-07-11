import { ProcessedData } from "../../../../../../interfaces";
import { getRegionsByCountry } from "./regionMapping";

export const getCountriesByRegionSelected = (regionSelected: string, processedData: ProcessedData[]) => {
  return processedData.filter((country) => {
    return getRegionsByCountry(processedData).find(
      (region) => region.name === regionSelected
    )?.countries.includes(country.name);
  });
}