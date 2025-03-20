import { getResourceUrl } from "./get-resource-url";
import { isProduction } from "./is-production";

export const fetchNui = (
    url: string,
    body?: string | number | boolean | Array<unknown> | Record<string, unknown>
) => {
    if (!isProduction()) {
        return Promise.resolve();
    }

    if (!fetch) {
        throw new Error('fetch is not defined');
    }

    return fetch(getResourceUrl(url), {
        method: "POST",
        body: body ? JSON.stringify(body) : undefined
    });
}