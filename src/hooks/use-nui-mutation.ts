import { useCallback, useEffect, useTransition } from "react";

import { FetchNuiBody } from "../utils/fetch-nui";
import { fetchNui } from "../utils/fetch-nui";

interface Options {
    body?: FetchNuiBody;
    onSuccess?: (value: Response | void) => void | PromiseLike<void>;
    onError?: (reason: unknown) => void | PromiseLike<void> | null | undefined;
    onFinally?: () => void | null | undefined;
}

export const useNuiMutation = (
    endpoint: string,
    options?: Options
) => {
    const [isPending, startTransition] = useTransition();

    const mutate = useCallback(() => {
        startTransition(() => {
            fetchNui(endpoint, options?.body)
                .then(options?.onSuccess)
                .catch(options?.onError)
                .finally(options?.onFinally);
        });
    }, [endpoint, options]);

    return {
        mutate,
        isPending
    }
}