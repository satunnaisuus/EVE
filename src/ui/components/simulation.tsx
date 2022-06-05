import * as React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { SimulationStore } from "../stores/simulation-store";
import { Viewport } from "./viewport";
import { Controls } from "./controls";
import { Flex } from "./flex";
import { Sidebar } from "./sidebar";

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
        <StyledSimulation>
            <Controls simulation={simulation} />
            <Sidebar simulation={simulation} />
            <Viewport simulation={simulation} />
        </StyledSimulation>
    );
});