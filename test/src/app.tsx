import { useEffect } from "react"
import { useNuiData, useNuiMessage, useVisible } from "fivem-react/hooks";
import { getResourceUrl } from "fivem-react/utils";
import { VisibleElement, VisibleClose } from "fivem-react/components";

export const App = () => {
    useNuiMessage("test", (data) => console.log(data));

    useEffect(() => {
        window.postMessage({ eventName: "nui:data:update", key: "users", data: ["adam", "kinkle", "honkey"] });
    }, []);

    // const { visible } = useVisible("test", false);

    useEffect(() => {
        // window.postMessage({ eventName: "nui:visible:update", elementId: "test", visible: false });
    }, []);

    // const data = useNuiData<string[]>("users", ["adam"]);

    return (
        <div>
            {/* {data?.toString()} */}
            {/* {getResourceUrl("test")} */}
            {/* <VisibleElement
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
            </VisibleElement> */}
            <VisibleElement elementId="test" initialValue={true}>
                test
                <VisibleClose>
                    x
                </VisibleClose>
            </VisibleElement>
        </div>
    )
}