import { TFunction } from "i18next";
import { EventLabels, ScopeLabels } from "../interfaces/stadistics.interface";
import { DEFAULT_SCOPE_LABELS } from "../config";

export const getScopeLabels = (widgetParams: any, translate:TFunction) => {

    let scopeLabels: ScopeLabels;

    if (widgetParams && widgetParams.parameters.scope_labels) {
      scopeLabels = {
        L: DEFAULT_SCOPE_LABELS.L,
        N: widgetParams.parameters.scope_labels.N,
        R: widgetParams.parameters.scope_labels.R,
        ALL: `${translate("total-events")}`
      }
    } else {
      scopeLabels = {
        L: DEFAULT_SCOPE_LABELS.L,
        N: `${translate(`${DEFAULT_SCOPE_LABELS.N}`)}`, // Traducir esto luego.
        R: `${translate(`${DEFAULT_SCOPE_LABELS.R}`)}`,
        ALL: `${translate(`${DEFAULT_SCOPE_LABELS.ALL}`)}`
      }
    }
    return scopeLabels;
  }

export const getEventLabels = (translate:TFunction) => {
    const eventLabels: EventLabels = {
        views: `${translate("views")}`,
        downloads:`${translate("downloads")}`,
        outlinks: `${translate("outlinks")}`,
        conversions: `${translate("conversions")}`
    };
    return eventLabels;
}