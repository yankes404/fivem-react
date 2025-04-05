import { useState } from "react";
import { useNuiMessage } from "./use-nui-message";

export const useNuiData = <T>(
    dataId: string,
    initialValue?: T
) => {
    const [data, setData] = useState<T | undefined>(initialValue);

    useNuiMessage<{ eventName: string; dataId: string; data: T }>("nui:data:update", (data?: { eventName: string; dataId: string; data: T }) => {
        if (data && data.dataId === dataId) {
            setData(data.data);
        }
    });

    return data;
}