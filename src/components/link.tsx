import { forwardRef } from "react";

import { openUrl } from "../utils/open-url";

type LinkProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href: string;
}

const Link = forwardRef<HTMLButtonElement, LinkProps>(({
    href,
    onClick,
    children,
    ...props
}, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        openUrl(href);
        onClick?.(e);
    }

    return (
        <button
            ref={ref}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    )
});

Link.displayName = "Link";

export { Link };