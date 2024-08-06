import { TFunction } from "i18next";
import { DEFAULT_EVENTS_LABELS, DEFAULT_SCOPES_KEYS } from "../../../../config";
import { EventLabels, ScopeLabels, Statistics, TimeBucket } from "../../../../interfaces/stadistics.interface";


export const renderValues = (bucket: TimeBucket, scope: string) => {
    if (scope === "ALL")
        return bucket.level.buckets.reduce(
            (acc, b) =>
                acc +
                (b.views?.value || 0) +
                (b.downloads?.value || 0) +
                (b.outlinks?.value || 0),
            0
        );

    const levelBucket = bucket.level.buckets.find(
        (b) => b.key === scope
    ) as any;
    const total =
        (levelBucket?.views?.value || 0) +
        (levelBucket?.downloads?.value || 0) +
        (levelBucket?.outlinks?.value || 0);

    return total.toLocaleString();
};

export const getHeaders = (activeScope: string, scopeLabels: ScopeLabels, eventLabels: EventLabels, t: TFunction) => {
    let headers: string[] = [];
    if (activeScope === "ALL") {
        headers = [
            t("months"),
            ...Object.keys(scopeLabels).map(
                (label) => scopeLabels[label as keyof ScopeLabels]
            ),
        ];
    } else {
        headers = [
            t("months"),
            ...DEFAULT_EVENTS_LABELS.map(
                (label) => eventLabels[label as keyof EventLabels]
            ),
        ];
    }

    return headers;
};

export const getRows = (activeScope: string, data: Statistics, t: TFunction) => {
    let rows: string[] = [];

    if (activeScope === "ALL") {
        rows = data.time.buckets.map((bucket) => {
            return [
                new Date(bucket.key_as_string).toLocaleString(
                    `${t("calendar-lang")}`,
                    { month: "short", year: "numeric" }
                ),
                DEFAULT_SCOPES_KEYS.map((scope) => renderValues(bucket, scope)).join(
                    ","
                ),
            ].join(",");
        });
    } else {
        rows = data.time.buckets.map((bucket) => {
            return [
                new Date(bucket.key_as_string).toLocaleString(
                    `${t("calendar-lang")}`,
                    { month: "short", year: "numeric" }
                ),
                DEFAULT_EVENTS_LABELS.map(
                    (event) =>
                        bucket.level.buckets
                            .find((b) => b.key === activeScope)
                            ?.[event as keyof EventLabels]?.value.toLocaleString() || 0
                ).join(","),
            ].join(",");
        });
    }

    return rows;
};

export const handleDownloadCsv = (
    activeScope: string,
    data: Statistics,
    t: TFunction,
    scopeLabels: ScopeLabels,
    eventLabels: EventLabels
) => {
    const headers = getHeaders(activeScope, scopeLabels, eventLabels, t);
    const rows = getRows(activeScope, data, t);

    const csvData = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${scopeLabels[activeScope as keyof ScopeLabels]}-data.csv`;
    a.click();
    URL.revokeObjectURL(url);
};

