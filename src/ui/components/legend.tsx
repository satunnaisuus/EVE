import * as React from "react";
import { observer } from "mobx-react-lite";
import { SimulationContext } from "../context";
import { useContext } from "react";
import styled from "styled-components";
import { Color } from "../../common/color";
import { Colors } from "../../renderer/colors";
import { RenderMode } from "../../renderer/renderer";

interface Props {
    
}

const Row = styled.div`
    display: flex;
    margin-bottom: 6px;
`;

const Title = styled.div`
    margin-bottom: 10px;
    font-weight: bold;
    margin-top: 15px;
`;

const ColorBlock = styled.div<{bg: Color}>`
    height: 15px;
    width: 15px;
    border: 2px solid #fff;
    background: ${({bg}) => bg.toHexFormat()};
    margin-right: 10px;
`;

const data: {[Property in RenderMode]: {label: string, color: Color}[]} = {
    default: [
        {label: 'Organism', color: Colors.organism}
    ],

    children: [
        {label: 'Less children', color: Colors.childrenMin},
        {label: 'More children', color: Colors.childrenMax},
    ],

    lifetime: [
        {label: 'More children', color: Colors.lifetimeMin},
        {label: 'More children', color: Colors.lifetimeMax},
    ],

    energy: [
        {label: 'Less energy', color: Colors.energyMin},
        {label: 'More energy', color: Colors.energyMax},
    ],

    action: [
        {label: 'Nothing', color: Colors.actions[0]},
        {label: 'Rotate left', color: Colors.actions[1]},
        {label: 'Rotate right', color: Colors.actions[2]},
        {label: 'Step', color: Colors.actions[3]},
        {label: 'Attack', color: Colors.actions[4]},
        {label: 'Eat', color: Colors.actions[5]},
        {label: 'Divide', color: Colors.actions[6]},
        {label: 'Photosynthesis', color: Colors.actions[8]},
        {label: 'Chemosynthesis', color: Colors.actions[9]},
    ],

    supply: [
        {label: 'Uses organic', color: Colors.supplyOrganic},
        {label: 'Uses photosynthesis', color: Colors.supplyPhotosynthesis},
        {label: 'Uses chemosynthesis', color: Colors.supplyChemosynthesis},
    ],

    attack: [
        {label: 'Less aggressive', color: Colors.aggressionMin},
        {label: 'More aggressive', color: Colors.aggressionMax},
    ],

    step: [
        {label: 'Less movement', color: Colors.stepMin},
        {label: 'More movement', color: Colors.stepMax},
    ],

    genesis: [],
}


export const Legend = observer(({}: Props) => {
    const simulation = useContext(SimulationContext);
    const mode = simulation.getRenderer().getRenderMode();

    return (
        <>
            <Title>Legend</Title>
            <Row>
                <ColorBlock bg={Colors.wall} />
                <span>Wall</span>
            </Row>
            <Row>
                <ColorBlock bg={Colors.organic} />
                <span>Organic</span>
            </Row>
            {data[mode].map((item, i) => (
                <Row key={i}>
                    <ColorBlock bg={item.color} />
                    <span>{item.label}</span>
                </Row>
            ))}
        </>
    );
});