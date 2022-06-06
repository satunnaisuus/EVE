import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { SimulationContext } from "../context";
import { StartPauseItem } from "./toolbar/start-pause-item";
import { StepItem } from "./toolbar/step-item";
import { RenderModeItem } from "./toolbar/render-mode-item";

const StyledToolbar = styled.div`
    display: flex;
    align-items: stretch;
    width: 100%;
    overflow-x: auto;
    background: ${props => props.theme.background};
    height: 50px;
    position: relative;
    z-index: 1;
    user-select: none;
`;

interface Props {
    
}

export const Toolbar = observer(({}: Props) => {
    const simulation = useContext(SimulationContext);

    return simulation.isReady() && <StyledToolbar>
        <StartPauseItem />
        <StepItem />
        <RenderModeItem />
    </StyledToolbar>;
});