import { useState } from "react";

import { isProduction } from "../utils/is-production";
import { useNuiMessage } from "./use-nui-message";
import { useNuiMutation } from "./use-nui-mutation";

export type InitialVisible = boolean | "DISPLAY_ON_DEVELOPMENT";

interface MessageData {
    eventName: string;
    elementId: string;
    visible: boolean;
}

export const useVisible = (
    elementId: string,
    initialValue: InitialVisible = true
) => {
    const [visible, setVisible] = useState(() => initialValue === "DISPLAY_ON_DEVELOPMENT" ? !isProduction() : initialValue === true);

    const {
        mutate,
        isPending: isClosing
    } = useNuiMutation();

    useNuiMessage<MessageData>("nui:visible:update", (data?: MessageData) => {
        if (data && data.elementId === elementId) {
            setVisible(data.visible);
        }
    });

    const close = () => mutate("nui:visible:close", {
        body: { elementId },
        onSuccess: () => setVisible(false)
    });

    return {
        visible,
        close,
        isClosing
    }
}