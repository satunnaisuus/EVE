import * as React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { faCogs } from "@fortawesome/free-solid-svg-icons/faCogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToolbarItem } from "./item";
import { SidebarTab } from "../../stores/simulation-ui-store";
import { SimulationContext } from "../simulation";

export const ParametersItem = observer(() => {
    const {ui} = useContext(SimulationContext);

    return (
        <ToolbarItem onClick={() => ui.toggleTab(SidebarTab.PARAMERS)} enabled={ui.isTabActive(SidebarTab.PARAMERS)}>
            <FontAwesomeIcon icon={faCogs} />
        </ToolbarItem>
    );
});