import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { SimulationContext } from "../../context";
import { useContext } from "react";
import { Visualization } from "./organism/visualization";

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const DangerText = styled.span`
    color: #ff0000;
`;

const SuccessText = styled.span`
    color: #00ff00;
`;

export const OrganismCell = observer(() => {
    const simulation = useContext(SimulationContext);
    const selectedCell = simulation.getSelectedCell();
    const cell = selectedCell.getCell();

    if (cell.type !== 'organism') {
        return;
    }

    return (
        <>
            <Container>
                <div>
                    <Visualization organism={cell} />
                    <Row>
                        <span>Status</span>
                        {selectedCell.isAlive() ? <SuccessText>Alive</SuccessText> : <DangerText>Dead</DangerText>}
                    </Row>
                    <Row>
                        <span>Energy</span>
                        <span>{cell.energy}</span>
                    </Row>
                    <Row>
                        <span>Lifetime</span>
                        <span>{cell.lifetime}</span>
                    </Row>
                    <Row>
                        <span>Divide limit</span>
                        <span>{cell.genome.divideLimit}</span>
                    </Row>
                </div>
            </Container>
        </>
    );
});