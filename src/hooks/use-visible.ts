import { useState } from "react";

import { isProduction } from "../utils/is-production";
import { useNuiMessage } from "./use-nui-message";
import { useNuiMutation } from "./use-nui-mutation";

export type InitialVisible = boolean | "DISPLAY_ON_DEVELOPMENT";

interface MessageData {
    eventName: string;
    key: string;
    visible: boolean;
}

export const useVisible = (
    key: string,
    initialValue: InitialVisible = true
) => {
    const [visible, setVisible] = useState(initialValue === "DISPLAY_ON_DEVELOPMENT" ? !isProduction() : initialValue);
    const {
        mutate,
        isPending: isClosing
    } = useNuiMutation();

    useNuiMessage<MessageData>("nui:visible:update", (data?: MessageData) => {
        if (data && data.key === key) {
            setVisible(data.visible);
        }
    });

    const close = () => mutate("nui:visible:close", {
        body: { key },
        onSuccess: () => setVisible(false)
    });

    return {
        visible,
        close,
        isClosing
    }
}