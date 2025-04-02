import { getResourceName } from "./get-resource-name";
import { getResourceUrl } from "./get-resource-url";
import { isProduction } from "./is-production";

export type FetchNuiBody = string | number | boolean | Array<unknown> | Record<string, unknown>;

export const fetchNui = (
    endpoint: string,
    body?: FetchNuiBody
) => {
    if (!isProduction()) {
        return Promise.resolve();
    }

    if (!fetch) {
        throw new Error('fetch is not defined');
    }

    return fetch(`${getResourceName()}${endpoint}`, {
        method: "POST",
        body: body ? JSON.stringify(body) : undefined
    });
}