import { useEffect } from "react"
import { useNuiData, useNuiMessage } from "fivem-react";

export const App = () => {
    useNuiMessage("test", (data) => console.log(data));

    useEffect(() => {
        window.postMessage({ eventName: "nui:data:update", key: "users", data: ["adam", "kinkle", "honkey"] });
    }, []);

    const data = useNuiData<string[]>("users", ["adam"]);

    return (
        <div>
            {data?.toString()}
        </div>
    )
}