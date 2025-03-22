import { createContext, forwardRef, useContext, useEffect } from "react";
import { InitialVisible, useVisible } from "../hooks/use-visible";
import { cn } from "../lib/utils";

type VisibleElementProps = React.HTMLAttributes<HTMLDivElement> & {
    key: string;
    initialValue?: InitialVisible;
    closedStyles?: React.CSSProperties;
    closedClassName?: string;
    closingStyles?: React.CSSProperties;
    closingClassName?: string;
    onOpen?: () => void;
    onClose?: () => void;
}

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

const VisibleElement = forwardRef<HTMLDivElement, VisibleElementProps>(({
    key,
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
}, ref) => {
    const {
        visible,
        close,
        isClosing
    } = useVisible(key, initialValue);

    useEffect(() => {
        if (visible && onOpen) onOpen();
        if (!visible && onClose) onClose();
    }, [visible, onOpen, onClose]);

    return (
        <VisibleContext.Provider
            value={{ visible, close, isClosing }}
        >
            <div
                ref={ref}
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
});

VisibleElement.displayName = "VisibleElement";

const VisibleButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({
    children,
    ...props
}, ref) => {
    const {
        visible,
        close,
        isClosing
    } = useContext(VisibleContext);

    return (
        <button
            ref={ref}
            onClick={close}
            disabled={isClosing || !visible}
            {...props}
        >
            {children}
        </button>
    )
});

VisibleButton.displayName = "VisibleButton";

export {
    VisibleElement,
    VisibleButton 
}