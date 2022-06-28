import * as React from "react";
import { observer } from "mobx-react-lite";
import { SimulationContext } from "../../context";
import { useContext } from "react";
import styled from "styled-components";
import { Direction } from "../../../simulation/types/cells";

interface Props {
    
}

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
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
    const cell = simulation.getSelectedCell();

    if (cell.type !== 'organism') {
        return;
    }

    return (
        <>
            <Row>
                <span><VisualizedOrganism color={cell.color} direction={cell.direction} /></span>
                <span>{cell.type}</span>
            </Row>
            <Row>
                <span>Energy</span>
                <span>{cell.energy}</span>
            </Row>
            <Row>
                <span>Lifetime</span>
                <span>{cell.lifetime}</span>
            </Row>
        </>
    );
});