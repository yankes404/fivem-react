import { useState } from "react";

import { isProduction } from "../utils/is-production";
import { useNuiMessage } from "./use-nui-message";

interface MessageData {
    eventName: string;
    key: string;
    visible: boolean;
}

export const useVisible = (
    key: string,
    initialValue: boolean | "DISPLAY_ON_DEVELOPMENT" = true
) => {
    const [visible, setVisible] = useState(initialValue === "DISPLAY_ON_DEVELOPMENT" ? !isProduction() : initialValue);

    useNuiMessage<MessageData>("nui:visible:update", (data?: MessageData) => {
        if (data && data.key === key) {
            setVisible(data.visible);
        }
    });

    return visible;
}