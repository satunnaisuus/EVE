import { observer } from "mobx-react-lite";
import * as React from "react";
import styled from "styled-components";
import { ControlsCard } from "./cards/controls-card";
import { NewSimulationCard } from "./cards/new-simulation-card";

const StyledSidebar = styled.div`
    width: 300px;
    padding: 10px;
    overflow-y: scroll;
`;

export const SidebarComponent = observer(() => {
    return (
        <StyledSidebar>
            <ControlsCard />
            <NewSimulationCard />
        </StyledSidebar>
    );
});