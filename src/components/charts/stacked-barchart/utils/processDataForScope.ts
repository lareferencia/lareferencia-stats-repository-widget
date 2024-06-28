import { Scope, Statistics } from "../../../../interfaces/stadistics.interface";

export const processDataForScope = ( data: Statistics, scopeAndEvent: string | Scope ) => {

    const seriesData: any[] = [];
    
    if ( typeof scopeAndEvent === 'string'){
        data.time.buckets.map( bucket => {
            const levelBucket = bucket.level.buckets.find(b => b.key === scopeAndEvent) as any;
            const views = levelBucket?.views?.value || 0;
            const downloads = levelBucket?.downloads?.value || 0;
            const outlinks = levelBucket?.outlinks?.value || 0;
            seriesData.push( views + downloads + outlinks );
        });
        return seriesData;
    } else {
        data.time.buckets.map( bucket => {
            const levelBucket = bucket.level.buckets.find(b => b.key === scopeAndEvent.scope) as any;
            const value = levelBucket?.[scopeAndEvent.event]?.value || 0;
            seriesData.push( value );
        });
        return seriesData;
    }

};
