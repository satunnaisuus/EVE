import * as React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { faMicroscope } from "@fortawesome/free-solid-svg-icons/faMicroscope";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToolbarItem } from "./item";
import { SidebarTab } from "../../stores/simulation-ui-store";
import { SimulationContext } from "../simulation";

export const CellItem = observer(() => {
    const {ui} = useContext(SimulationContext);

    return (
        <ToolbarItem onClick={() => ui.toggleTab(SidebarTab.CELL)} enabled={ui.isTabActive(SidebarTab.CELL)}>
            <FontAwesomeIcon icon={faMicroscope} />
        </ToolbarItem>
    );
});