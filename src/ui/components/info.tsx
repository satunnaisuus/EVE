import * as React from "react";
import { observer } from "mobx-react-lite";
import { SimulationContext } from "../context";
import { useContext } from "react";
import styled from "styled-components";
import { Legend } from "./legend";

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
`;

export const Info = observer(() => {
    const simulation = useContext(SimulationContext);

    return (
        <>
            <Row>
                <span>Size</span>
                <span>{simulation.getWidth()}×{simulation.getHeight()}</span>
            </Row>
            <Row>
                <span>Step</span>
                <span>{simulation.getCurrentStep()}</span>
            </Row>
            <Row>
                <span>Step time</span>
                <span>{simulation.getStepTime()} ms</span>
            </Row>
            <Row>
                <span>Render time</span>
                <span>{simulation.getRenderer().getRenderTime()} ms</span>
            </Row>
            <Row>
                <span>Organisms count</span>
                <span>{simulation.getOrganismsCount()}</span>
            </Row>
            <Legend />
        </>
    );
});