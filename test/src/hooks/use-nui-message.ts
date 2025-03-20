import { useEffect } from "react"

export const useNuiMessage = <T>(
    eventName: string,
    callback: (data?: T) => void
) => {
    useEffect(() => {
        const onMessage = ({ data }: MessageEvent<{ eventName: string, data?: T }>) => {
            if (data.eventName === eventName) {
                callback(data.data);
            }
        }

        window.addEventListener("message", onMessage);

        return () => window.removeEventListener("message", onMessage);
    }, []);
}