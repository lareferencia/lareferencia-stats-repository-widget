export interface ByCountryStats {
    country:     Country;
    conversions: Event;
    downloads:   Event;
    outlinks:    Event;
    views:       Event;
}

export interface Event {
    value: number;
}

export interface Country {
    doc_count_error_upper_bound: number;
    sum_other_doc_count:         number;
    buckets:                     Bucket[];
}

export interface Bucket {
    key:         string;
    doc_count:   number;
    conversions: Event;
    downloads:   Event;
    outlinks:    Event;
    views:       Event;
}
export interface CountryObject {
    name: string;
    value: number;
    views: number;
    downloads: number;
    outlinks: number;
    conversions: number;
  };
  
