import { useState } from "react";

import { isProduction } from "../utils/is-production";
import { useNuiMessage } from "./use-nui-message";

interface MessageData {
    eventName: string;
    key: string;
    display: boolean;
}

export const useDisplay = (
    key: string,
    initialValue: boolean | "DISPLAY_ON_DEVELOPMENT" = true
) => {
    const [display, setDisplay] = useState(initialValue === "DISPLAY_ON_DEVELOPMENT" ? !isProduction() : initialValue);

    useNuiMessage<MessageData>("nui:display:update", (data?: MessageData) => {
        if (data && data.key === key) {
            setDisplay(data.display);
        }
    });

    return display;
}