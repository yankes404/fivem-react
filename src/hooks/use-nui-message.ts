import { useEffect } from "react";

export const useNuiMessage = <T extends { eventName: string }>(
    eventName: string,
    callback: (data?: T) => void
) => {
    useEffect(() => {
        const onMessage = ({ data }: MessageEvent<T>) => {
            if (data.eventName === eventName) {
                callback(data);
            }
        }

        window.addEventListener("message", onMessage);

        return () => window.removeEventListener("message", onMessage);
    }, [eventName, callback]);
}