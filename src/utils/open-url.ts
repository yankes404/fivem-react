declare global {
    interface Window {
        invokeNative: (method: "openUrl", url: string) => void
    }
}

export const openUrl = (url: string) => window.invokeNative("openUrl", url);