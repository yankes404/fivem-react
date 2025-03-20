import { useState } from "react";
import { useNuiMessage } from "./use-nui-message";

export const useNuiData = <T>(
    key: string,
    initialValue?: T
) => {
    const [data, setData] = useState<T | undefined>(initialValue);

    useNuiMessage<{ eventName: string; key: string; data: T }>("nui:data:update", (data?: { eventName: string; key: string; data: T }) => {
        if (data && data.key === key) {
            setData(data.data);
        }
    });

    return data;
}