import * as React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { faDna } from "@fortawesome/free-solid-svg-icons/faDna";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimulationContext } from "../../context";
import { ToolbarItem } from "./item";
import { SidebarTab } from "../../stores/simulation-ui";

export const GenomesItem = observer(() => {
    const simulation = useContext(SimulationContext);
    const ui = simulation.getUI();

    return (
        <ToolbarItem onClick={() => ui.toggleTab(SidebarTab.GENOMES)} enabled={ui.isTabActive(SidebarTab.GENOMES)}>
            <FontAwesomeIcon icon={faDna} />
        </ToolbarItem>
    );
});