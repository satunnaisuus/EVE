import * as React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { SimulationStore } from "../stores/simulation-store";
import { Parameters } from "./parameters";
import { useContext } from "react";
import { SimulationContext } from "../context";
import { SidebarTabs } from "./sidebar/sidebar-tabs";
import { TabPane } from "./sidebar/tab-pane";
import { SimulationTabType } from "../stores/simulation-ui";

const StyledSidebar = styled.div`
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    display: flex;
`;

interface Props {
    
}

export const Sidebar = observer(({}: Props) => {
    const simulation = useContext(SimulationContext);
    const ui = simulation.getUI();
    const openedTab = ui.getOpenedTab();
    return (
        <StyledSidebar>
            <SidebarTabs />
            <TabPane active={openedTab === SimulationTabType.PARAMETERS}>
                <Parameters />
            </TabPane>
        </StyledSidebar>
    );
});