import * as React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { faMicroscope } from "@fortawesome/free-solid-svg-icons/faMicroscope";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimulationContext } from "../../context";
import { ToolbarItem } from "./item";
import { SidebarTab } from "../../stores/simulation-ui";

interface Props {
    
}

export const CellItem = observer(({}: Props) => {
    const simulation = useContext(SimulationContext);
    const ui = simulation.getUI();

    return (
        <ToolbarItem onClick={() => ui.toggleTab(SidebarTab.CELL)} enabled={ui.isTabActive(SidebarTab.CELL)}>
            <FontAwesomeIcon icon={faMicroscope} />
        </ToolbarItem>
    );
});