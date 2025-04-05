import { openUrl } from "../utils";

function Link ({
    children,
    href,
    onClick,
    ...props
}: React.ComponentProps<"button"> & { href: string }) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        openUrl(href);
        onClick?.(e);
    }

    return (
        <button
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    )
}

export { Link }