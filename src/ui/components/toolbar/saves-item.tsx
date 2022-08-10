import * as React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { faSdCard } from "@fortawesome/free-solid-svg-icons/faSdCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimulationContext } from "../../context";
import { ToolbarItem } from "./item";
import { SidebarTab } from "../../stores/simulation-ui";

export const SavesItem = observer(() => {
    const simulation = useContext(SimulationContext);
    const ui = simulation.getUI();

    return (
        <ToolbarItem onClick={() => ui.toggleTab(SidebarTab.SAVES)} enabled={ui.isTabActive(SidebarTab.SAVES)}>
            <FontAwesomeIcon icon={faSdCard} />
        </ToolbarItem>
    );
});