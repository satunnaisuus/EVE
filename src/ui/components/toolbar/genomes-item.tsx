import * as React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { faDna } from "@fortawesome/free-solid-svg-icons/faDna";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToolbarItem } from "./item";
import { SidebarTab } from "../../stores/simulation-ui-store";
import { SimulationContext } from "../simulation";

export const GenomesItem = observer(() => {
    const {ui} = useContext(SimulationContext);

    return (
        <ToolbarItem onClick={() => ui.toggleTab(SidebarTab.GENOMES)} enabled={ui.isTabActive(SidebarTab.GENOMES)}>
            <FontAwesomeIcon icon={faDna} />
        </ToolbarItem>
    );
});