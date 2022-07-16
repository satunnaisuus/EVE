import * as React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { faCogs } from "@fortawesome/free-solid-svg-icons/faCogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimulationContext } from "../../context";
import { ToolbarItem } from "./item";

interface Props {
    
}

export const ParametersItem = observer(({}: Props) => {
    const simulation = useContext(SimulationContext);
    const ui = simulation.getUI();

    return (
        <ToolbarItem onClick={() => ui.toggleTab('parameters')} enabled={ui.isTabActive('parameters')}>
            <FontAwesomeIcon icon={faCogs} />
        </ToolbarItem>
    );
});