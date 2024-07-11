export interface ByCountryStats {
    country:     Country;
    conversions: Count;
    downloads:   Count;
    outlinks:    Count;
    views:       Count;
}

export interface Count {
    value: number;
}

export interface Country {
    doc_count:   number;
    conversions: CountryEvent;
    downloads:   CountryEvent;
    outlinks:    CountryEvent;
    views:       CountryEvent;
}

export interface CountryEvent {
    doc_count_error_upper_bound: number;
    sum_other_doc_count:         number;
    buckets:                     Country[];
}

export interface Country {
    key:       string;
    doc_count: number;
    count:     Count;
}
