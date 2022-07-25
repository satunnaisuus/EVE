import * as React from "react";
import { observer } from "mobx-react-lite";
import { SimulationContext } from "../../context";
import { useContext } from "react";
import styled from "styled-components";
import { Direction } from "../../../simulation/types/cells";
import { toJS } from "mobx";

interface Props {
    
}

const actionMap = {
    ROTATE_LEFT: 'Rotate left',
    ROTATE_RIGHT:'Rotate right' ,
    STEP: 'Step',
    ATTACK: 'Attack',
    EAT: 'Eat',
    DIVIDE: 'Divide',
    NOTHING: 'Nothing',
    PHOTOSYNTHESIS: 'Photosynthesis',
    CHEMOSYNTHESIS: 'Chemosynthesis',
};

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

const History = styled.div`
    flex-grow: 1;
    overflow-y: auto;
`;

const VisualizedOrganism = styled.div<{direction: Direction, color: string}>`
    width: 30px;
    height: 30px;
    border: 2px solid ${({color}) => color};
    background: ${({color}) => color};
    display: flex;
    border-radius: 2px;
    justify-content: ${({direction}) => {
        if (['WEST', 'SOUTH_WEST', 'NORTH_WEST'].includes(direction)) {
            return 'flex-start';
        }

        if (['EAST', 'SOUTH_EAST', 'NORTH_EAST'].includes(direction)) {
            return 'flex-end';
        }

        return 'center';
    }};
    align-items: ${({direction}) => {
        if (['NORTH', 'NORTH_WEST', 'NORTH_EAST'].includes(direction)) {
            return 'flex-start';
        }

        if (['SOUTH', 'SOUTH_EAST', 'SOUTH_EAST'].includes(direction)) {
            return 'flex-end';
        }

        return 'center';
    }};

    &:before {
        content: "";
        background: #fff;
        width: 33%;
        height: 33%;
        display: block;
        border-radius: 100%;
        border: 1px solid #000;
    }
`;

export const OrganismCell = observer(({}: Props) => {
    const simulation = useContext(SimulationContext);
    const selectedCell = simulation.getSelectedCell();
    const cell = selectedCell.getCell();
    const history = selectedCell.getHistory();

    if (cell.type !== 'organism') {
        return;
    }

    return (
        <>
            <Container>
                <div>
                    <Row>
                        <span><VisualizedOrganism color={cell.genome.color} direction={cell.direction} /></span>
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
                {history.length > 0 && <>
                    <h3>Action history</h3>
                    <History>{history.map((action, i) => <div key={i}>{actionMap[action]}</div>)}</History>
                </>}
            </Container>
        </>
    );
});