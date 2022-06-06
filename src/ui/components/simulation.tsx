import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { SimulationStore } from "../stores/simulation-store";
import { Viewport } from "./viewport";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { SimulationContext } from "../context";

const StyledSimulation = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
`;

interface Props {
    simulation: SimulationStore;
}

export const Simulation = observer(({simulation}: Props) => {
    return (
        <SimulationContext.Provider value={simulation}>
            <StyledSimulation>
                <Toolbar />
                <Sidebar />
                <Viewport />
            </StyledSimulation>
        </SimulationContext.Provider>
    );
});