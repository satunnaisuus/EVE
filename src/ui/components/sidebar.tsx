import { observer } from "mobx-react-lite";
import * as React from "react";
import styled from "styled-components";
import { ControlsCard } from "./cards/controls-card";
import { StatisticsCard } from "./cards/statistics-card";
import { NewSimulationCard } from "./cards/new-simulation-card";
import { SimulationParamsCard } from "./cards/simulation-params-card";

const StyledSidebar = styled.div`
    width: 300px;
    padding: 10px;
    overflow-y: scroll;
`;

export const SidebarComponent = observer(() => {
    return (
        <StyledSidebar>
            <StatisticsCard />
            <ControlsCard />
            <NewSimulationCard />
            <SimulationParamsCard />
        </StyledSidebar>
    );
});