import { useEffect } from "react"
import { useNuiData, useNuiMessage } from "fivem-react/hooks";
import { getResourceUrl } from "fivem-react/utils";

export const App = () => {
    useNuiMessage("test", (data) => console.log(data));

    useEffect(() => {
        window.postMessage({ eventName: "nui:data:update", key: "users", data: ["adam", "kinkle", "honkey"] });
    }, []);

    // const data = useNuiData<string[]>("users", ["adam"]);

    return (
        <div>
            {/* {data?.toString()} */}
            {getResourceUrl("test")}
        </div>
    )
}