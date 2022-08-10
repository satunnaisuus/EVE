import * as React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { faCogs } from "@fortawesome/free-solid-svg-icons/faCogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimulationContext } from "../../context";
import { ToolbarItem } from "./item";
import { SidebarTab } from "../../stores/simulation-ui";

export const ParametersItem = observer(() => {
    const simulation = useContext(SimulationContext);
    const ui = simulation.getUI();

    return (
        <ToolbarItem onClick={() => ui.toggleTab(SidebarTab.PARAMERS)} enabled={ui.isTabActive(SidebarTab.PARAMERS)}>
            <FontAwesomeIcon icon={faCogs} />
        </ToolbarItem>
    );
});