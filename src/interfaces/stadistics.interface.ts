export interface Statistics {
  conversions: Event;
  level:       Level;
  downloads:   Event;
  outlinks:    Event;
  time:        Time;
  views:       Event;
}

export interface Event {
  value: number;
}

export interface Level {
  doc_count_error_upper_bound: number;
  sum_other_doc_count:         number;
  buckets:                     LevelBucket[];
}

export interface LevelBucket {
  key:         Key | string;
  doc_count:   number;
  conversions: Event;
  downloads:   Event;
  outlinks:    Event;
  views:       Event;
}

export enum Key {
  L = "L",
  N = "N",
  R = "R",
  ALL = "ALL",
}

export interface Time {
  buckets: TimeBucket[];
}

export interface TimeBucket {
  key_as_string: Date;
  key:           number;
  doc_count:     number;
  level:         Level;
}

export type LevelBucketProperty = 'views' | 'outlinks' | 'downloads' | 'conversions';

export type Scope = {
  scope: string;
  event: string;
};


export type ScopeLabels = {
  L: string;
  N: string;
  R: string;
  ALL: string;
};

export type EventLabels = {
  views: string;
  downloads: string;
  outlinks: string;
  conversions: string;
};