import { createContext, useContext, useEffect } from "react";

import { InitialVisible, useVisible } from "../hooks/use-visible";
import { cn } from "../lib/utils";

type ContextProps = {
    visible: boolean;
    close: () => void;
    isClosing: boolean;
}

const VisibleContext = createContext<ContextProps>({
    visible: false,
    close: () => {},
    isClosing: false
});

export type VisibleElementProps = React.ComponentProps<"div"> & {
    elementId: string;
    initialValue?: InitialVisible;
    closedStyles?: React.CSSProperties;
    closedClassName?: string;
    closingStyles?: React.CSSProperties;
    closingClassName?: string;
    onOpen?: () => void;
    onClose?: () => void;
}

function VisibleElement ({
    elementId,
    initialValue = "DISPLAY_ON_DEVELOPMENT",
    children,
    style,
    className,
    closedStyles,
    closedClassName,
    closingStyles,
    closingClassName,
    onOpen,
    onClose,
    ...props
}: VisibleElementProps) {
    const {
        visible,
        close,
        isClosing
    } = useVisible(elementId, initialValue);

    useEffect(() => {
        if (visible && onOpen) onOpen();
        if (!visible && onClose) onClose();
    }, [visible, onOpen, onClose]);

    return (
        <VisibleContext.Provider
            value={{ visible, close, isClosing }}
        >
            <div
                className={cn(
                    className,
                    isClosing && closingClassName,
                    !visible && closedClassName
                )}
                style={{
                    transition: "opacity .1s ease-in-out",
                    opacity: isClosing ? 0 : 1,
                    ...(isClosing ? { opacity: .5, pointerEvents: "none", ...closingStyles } : {}),
                    ...(visible ? {} : { opacity: 0, scale: 0, ...closedStyles }),
                    ...style,
                }}
                {...props}
            >
                {children}
            </div>
        </VisibleContext.Provider>
    )
}

function VisibleClose ({ children, ...props }: React.ComponentProps<"button">) {
    const {
        visible,
        close,
        isClosing
    } = useContext(VisibleContext);

    return (
        <button
            onClick={close}
            disabled={isClosing || !visible}
            {...props}
        >
            {children}
        </button>
    )
}

export {
    VisibleElement,
    VisibleClose,
}