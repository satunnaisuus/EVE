import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { SimulationStore } from "../stores/simulation-store";
import { Viewport } from "./viewport";
import { Overlay } from "./overlay";
import { Toolbar } from "./toolbar";
import { SimulationUIStore } from "../stores/simulation-ui-store";
import { createContext } from "react";
import { RendererStore } from "../stores/renderer-store";
import { SelectedCell } from "../stores/selected-cell";
import { SimulationParametersStore } from "../stores/simulation-parameters-store";

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

interface SimulationContextValue {
    simulation: SimulationStore,
    ui: SimulationUIStore,
    renderer: RendererStore,
    selectedCell: SelectedCell,
    parameters: SimulationParametersStore,
}

export const SimulationContext = createContext<SimulationContextValue>({
    simulation: null,
    ui: null,
    renderer: null,
    selectedCell: null,
    parameters: null
});

export const Simulation = observer(({simulation}: Props) => {
    const simulationContextValue = {
        simulation: simulation,
        ui: simulation.getUI(),
        renderer: simulation.getRendererStore(),
        selectedCell: simulation.getSelectedCell(),
        parameters: simulation.getParameters(),
    };

    return (
        <SimulationContext.Provider value={simulationContextValue}>
            {simulation.isReady() && 
                <StyledSimulation>
                    <Toolbar />
                    <Overlay />
                    <Viewport />
                </StyledSimulation>
            }
        </SimulationContext.Provider>
    );
});