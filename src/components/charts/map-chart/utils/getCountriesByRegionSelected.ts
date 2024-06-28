import { ByCountryStats } from "../../../../interfaces/byCountry.interface";
import { getRegionsByCountry } from "./regionMapping";

export const getCountriesByRegionSelected = (regionSelected: string, data:ByCountryStats) => {
    return data.country.buckets.filter((country) => {
      return getRegionsByCountry(data.country.buckets).find(
        (region) => region.name === regionSelected
      )?.countries.includes(country.key);
    });
  }