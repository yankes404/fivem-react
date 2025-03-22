import { useEffect } from "react"
import { useNuiData, useNuiMessage } from "fivem-react/hooks";
import { getResourceUrl } from "fivem-react/utils";
import { VisibleElement, VisibleButton } from "fivem-react/components";

export const App = () => {
    useNuiMessage("test", (data) => console.log(data));

    useEffect(() => {
        window.postMessage({ eventName: "nui:data:update", key: "users", data: ["adam", "kinkle", "honkey"] });
    }, []);

    // const data = useNuiData<string[]>("users", ["adam"]);

    return (
        <div>
            {/* {data?.toString()} */}
            {/* {getResourceUrl("test")} */}
            <VisibleElement
                key="test"
                initialValue={true}
                style={{ 
                    transition: "2s ease-in-out",
                }}
                closedStyles={{
                    color: "red",
                    opacity: 1,
                    scale: 1
                }}
            >
                test
                <VisibleButton>
                    x
                </VisibleButton>
            </VisibleElement>
        </div>
    )
}