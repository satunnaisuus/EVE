import { observer } from "mobx-react-lite";
import * as React from "react";
import styled from "styled-components";
import { ControlsCard } from "./cards/controls-card";
import { StatisticsCard } from "./cards/statistics-card";
import { NewSimulationCard } from "./cards/new-simulation-card";

const StyledSidebar = styled.div`
    width: 300px;
    padding: 10px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        overflow: visible;
        width: 3px;
    }

    &::-webkit-scrollbar:hover {
        width: 10px;
    }
     
    &::-webkit-scrollbar-thumb {
        background-color: #fff;
    }
`;

export const SidebarComponent = observer(() => {
    return (
        <StyledSidebar>
            <ControlsCard />
            <StatisticsCard />
            <NewSimulationCard />
        </StyledSidebar>
    );
});