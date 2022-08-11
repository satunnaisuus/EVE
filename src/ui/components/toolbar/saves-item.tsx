import * as React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { faSdCard } from "@fortawesome/free-solid-svg-icons/faSdCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToolbarItem } from "./item";
import { SidebarTab } from "../../stores/simulation-ui-store";
import { SimulationContext } from "../simulation";

export const SavesItem = observer(() => {
    const {ui} = useContext(SimulationContext);

    return (
        <ToolbarItem onClick={() => ui.toggleTab(SidebarTab.SAVES)} enabled={ui.isTabActive(SidebarTab.SAVES)}>
            <FontAwesomeIcon icon={faSdCard} />
        </ToolbarItem>
    );
});