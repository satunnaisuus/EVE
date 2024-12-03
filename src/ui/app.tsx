import { observer } from "mobx-react-lite";
import * as React from "react";
import { useContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Simulation } from "./components/simulation";
import { THEME } from "./theme";
import { MainMenu } from "./components/main-menu";
import { RootStoreContext } from "./stores/root-store";
import { GridLoopType } from "../simulation/types/grid-loop-type";

const StyledApp = styled.div`
    height: 100vh;
    background: #000;
    display: flex;
    color: #fff;
`;

const View = observer(() => {
    const store = useContext(RootStoreContext);
    const simulation = store.getSimulationStore();

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const autoStart = urlParams.get('auto_start');

        if (autoStart) {
            (async () => {
                const stimulationStore = await store.newSimulation({
                    width: 200,
                    height: 100,
                    loop: GridLoopType.HORIZONTAL,
                    population: 0.1,
                    initialEnergy: 70,
                    lightDepth: 75,
                    lightGradient: true,
                    mineralsDepth: 75,
                    mineralsGradient: true,
                    programLength: 24,
                }, false);

                stimulationStore.getRendererStore().setRenderMode('genesis');
            })();
        }
    }, []);

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