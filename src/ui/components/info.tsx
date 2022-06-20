import * as React from "react";
import { observer } from "mobx-react-lite";
import { SimulationContext } from "../context";
import { useContext } from "react";
import styled from "styled-components";

interface Props {
    
}

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
`;

export const Info = observer(({}: Props) => {
    const simulation = useContext(SimulationContext);

    return (
        <>
            <Row>
                <span>Step</span>
                <span>{simulation.getCurrentStep()}</span>
            </Row>
            <Row>
                <span>Step time</span>
                <span>{simulation.getStepTime()} ms</span>
            </Row>
            <Row>
                <span>Organisms count</span>
                <span>{simulation.getOrganismsCount()}</span>
            </Row>
        </>
    );
});