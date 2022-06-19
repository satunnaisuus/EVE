import * as React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons/faRotateRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "../../context";
import { ToolbarItem } from "./item";

interface Props {
    
}

export const NewSimulationItem = observer(({}: Props) => {
    const app = useContext(AppContext);

    return (
        <ToolbarItem onClick={() => app.closeSimulation()}>
            <FontAwesomeIcon icon={faRotateRight} />
        </ToolbarItem>
    );
});