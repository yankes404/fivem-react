import { isProduction } from "./is-production";

export const getResourceUrl = (
    url: string,
    developmentUrl?: string
) => {
    if (!isProduction()) {
        return developmentUrl ?? url;
    }

    if (!window) {
        throw new Error('window is not defined');
    }

    return window.location.origin + url;
}