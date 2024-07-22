import { ByCountryStats, ProcessedData } from "../interfaces";
import { DEFAULT_EVENTS_LABELS } from "../config";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
countries.registerLocale(enLocale);




interface CountryData {
    name: string ;
    value: number;
    views: number;
    downloads: number;
    outlinks: number;
    conversions: number;
}

type MetricKey = "views" | "downloads" | "outlinks" | "conversions";

export const processRawData = (data: ByCountryStats) => {

    let processedData: ProcessedData[] = [];

    const countryList = data.country.conversions.buckets.map(
        (bucket) => bucket.key
    );

    countryList.forEach((country) => {
        const name = countries.getName(country, "en");
        const countryData: CountryData = {
            name: name || country,
            value: 0,
            views: 0,
            downloads: 0,
            outlinks: 0,
            conversions: 0,
        };
 
        const events = DEFAULT_EVENTS_LABELS as MetricKey[];

        events.forEach((metric) => {
            const event = data.country[metric];
            const value =
                event.buckets.find((bucket) => bucket.key === country)?.count
                    .value || 0;
            countryData[metric] = value;
        });

        countryData.value =
            countryData.views +
            countryData.downloads +
            countryData.outlinks +
            countryData.conversions;
        processedData.push(countryData);
    });

    return processedData;
}