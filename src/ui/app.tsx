import { observer } from "mobx-react-lite";
import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { Simulation } from "./components/simulation";
import { AppContext } from "./context";
import { CreateSimulationForm } from "./components/create-simulation-form";
import { loadOptions } from "./storage";

const StyledApp = styled.div`
    height: 100vh;
    background: #000;
    display: flex;
    color: #fff;
`;

const View = observer(() => {
    const store = useContext(AppContext);
    const simulation = store.getSimulation();

    if (simulation) {
        return <Simulation simulation={simulation} />;
    }

    return <CreateSimulationForm options={loadOptions()} onCreate={(options) => store.newSimulation(options)} />;
});

export const App = observer(() => {
    return (
        <StyledApp>
            <View />
        </StyledApp>
    );
});