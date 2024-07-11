import axios from "axios";
import { DEFAULT_BASE_URL, DEFAULT_BY_COUNTRY_WS, DEFAULT_EMBED_FUNCTION_NAME, DEFAULT_REPOSITORY_WS } from "../config";

export const embedFunctionName = DEFAULT_EMBED_FUNCTION_NAME
export const baseUrl = DEFAULT_BASE_URL

export const repositoryWs = DEFAULT_REPOSITORY_WS;
export const byCountryWs = DEFAULT_BY_COUNTRY_WS;

export const fetchData = async (
    ws: string,
    source_id: string,
    start_date: Date | string,
    end_date: Date | string,
    time_unit: string
) => {

    try {
        const params = {
            source_id,
            start_date,
            end_date,
            time_unit
        }

        const { data } = await axios.get(baseUrl + ws, { params })
        return data

    } catch (error) {
        return error
    }
}