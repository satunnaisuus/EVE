import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { StartPauseItem } from "./toolbar/start-pause-item";
import { StepItem } from "./toolbar/step-item";
import { RenderModeItem } from "./toolbar/render-mode-item";
import { NewSimulationItem } from "./toolbar/new-simulation-item";
import { PaintModeItem } from "./toolbar/paint-mode-item";
import { ParametersItem } from "./toolbar/parameters-item";
import { InfoItem } from "./toolbar/info-item";
import { CellItem } from "./toolbar/cell-item";
import { GenomesItem } from "./toolbar/genomes-item";

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
    box-shadow: 0 0 14px 0 #00000066;
`;

const StyledGroup = styled.div<{justify: string}>`
    display: flex;
    align-items: stretch;
    height: 100%;
    z-index: 1;
    flex-grow: 1;
    justify-content: ${props => props.justify};
`;

interface Props {
    
}

export const Toolbar = observer(({}: Props) => {
    return (
        <StyledToolbar>
            <StyledGroup justify="flex-start">
                <ParametersItem />
                <CellItem />
                <GenomesItem />
            </StyledGroup>

            <StyledGroup justify="center">
                <StartPauseItem />
                <StepItem />
                <NewSimulationItem />
            </StyledGroup>
            
            <StyledGroup justify="flex-end">
                <RenderModeItem />
                <PaintModeItem />
                <InfoItem />
            </StyledGroup>
        </StyledToolbar>
    );
});