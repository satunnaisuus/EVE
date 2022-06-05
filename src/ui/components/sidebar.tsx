import * as React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { SimulationStore } from "../stores/simulation-store";
import { ParametersCard } from "./parameters-card";

const StyledSidebar = styled.div`
    width: 300px;
    overflow-y: auto;
    padding: 10px;
    position: absolute;
    top: 70px;
    left: 0;
    max-height: 100%;
`;

interface Props {
    simulation: SimulationStore;
}

export const Sidebar = observer(({simulation}: Props) => {
    return (
        <StyledSidebar>
            {simulation.isReady() && <>
                <ParametersCard simulation={simulation} />
            </>}
        </StyledSidebar>
    );
});