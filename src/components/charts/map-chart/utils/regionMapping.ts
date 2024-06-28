import { Bucket } from "../../../../interfaces/byCountry.interface";

type RegionMapping = {
    name: string;
    countries: string[];
};

export const regionMapping: RegionMapping[] = [
    {
        name: 'northamerica',
        countries: ['us', 'ca', 'mx']
    },
    {
        name: 'southamerica',
        countries: ['ar', 'bo', 'br', 'cl', 'co', 'ec', 'gy', 'py', 'pe', 'sr', 'uy', 've']
    },
    {
        name: 'europe',
        countries: ['al', 'ad', 'am', 'at', 'az', 'by', 'be', 'ba', 'bg', 'hr', 'cy', 'cz', 'dk', 'ee', 'fi', 'fr', 'ge', 'de', 'gr', 'hu', 'is', 'ie', 'it', 'kz', 'xk', 'lv', 'li', 'lt', 'lu', 'mt', 'md', 'mc', 'me', 'nl', 'mk', 'no', 'pl', 'pt', 'ro', 'ru', 'sm', 'rs', 'sk', 'si', 'es', 'se', 'ch', 'tr', 'ua', 'gb', 'va']
    },
    {
        name: 'oceania',
        countries: ['au', 'fj', 'ki', 'mh', 'fm', 'nr', 'nz', 'pw', 'pg', 'ws', 'sb', 'to', 'tv', 'vu']
    },
    {
        name: 'africa',
        countries: ['dz', 'ao', 'bj', 'bw', 'bf', 'bi', 'cv', 'cm', 'cf', 'td', 'km', 'cg', 'cd', 'dj', 'eg', 'gq', 'er', 'sz', 'et', 'ga', 'gm', 'gh', 'gn', 'gw', 'ci', 'ke', 'ls', 'lr', 'ly', 'mg', 'mw', 'ml', 'mr', 'mu', 'yt', 'ma', 'mz', 'na', 'ne', 'ng', 'rw', 're', 'sh', 'st', 'sn', 'sc', 'sl', 'so', 'za', 'ss', 'sd', 'tz', 'tg', 'tn', 'ug', 'zm', 'zw']
    },
    {
        name: 'asia',
        countries: ['af', 'az', 'bh', 'bd', 'bt', 'bn', 'kh', 'cn', 'cy', 'ge', 'in', 'id', 'ir', 'iq', 'il', 'jp', 'jo', 'kz', 'kw', 'kg', 'la', 'lb', 'my', 'mv', 'mn', 'mm', 'np', 'kp', 'om', 'pk', 'ps', 'ph', 'qa', 'sa', 'sg', 'kr', 'lk', 'sy', 'tw', 'tj', 'th', 'tl', 'tr', 'tm', 'ae', 'uz', 'vn', 'ye']
    }
];


type RegionsData = {
    name: string;
    countries: string[];
}
export const getRegionsByCountry = (countries: Bucket[]): RegionsData[] => {
    const regions: RegionsData[] = [];

    regionMapping.forEach(region => {
        const countriesInRegion: string[] = [];

        countries.forEach(country => {
            if (region.countries.includes(country.key)) {
                countriesInRegion.push(country.key);
            }
        });

        if (countriesInRegion.length > 0) {
            regions.push({
                name: region.name,
                countries: countriesInRegion
            });
        }
    });
    

    return regions;
}
