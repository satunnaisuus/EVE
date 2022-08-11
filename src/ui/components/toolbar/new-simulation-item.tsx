import * as React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons/faRotateRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToolbarItem } from "./item";
import { RootStoreContext } from "../../stores/root-store";

export const NewSimulationItem = observer(() => {
    const store = useContext(RootStoreContext);

    return (
        <ToolbarItem onClick={() => store.closeSimulation()}>
            <FontAwesomeIcon icon={faRotateRight} />
        </ToolbarItem>
    );
});