import { observer } from "mobx-react-lite";
import * as React from "react";
import { useContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Simulation } from "./components/simulation";
import { AppContext } from "./context";
import { THEME } from "./theme";
import { MainMenu } from "./components/main-menu";

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

    return <MainMenu />;
});

export const App = observer(() => {
    return (
        <ThemeProvider theme={THEME}>
            <StyledApp>
                <View />
            </StyledApp>
        </ThemeProvider>
        
    );
});