import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { StartPauseItem } from "./toolbar/start-pause-item";
import { StepItem } from "./toolbar/step-item";
import { RenderModeItem } from "./toolbar/render-mode-item";
import { NewSimulationItem } from "./toolbar/new-simulation-item";
import { PaintModeItem } from "./toolbar/paint-mode-item";

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
    return (
        <StyledToolbar>
            <StartPauseItem />
            <StepItem />
            <RenderModeItem />
            <PaintModeItem />
            <NewSimulationItem />
        </StyledToolbar>
    );
});