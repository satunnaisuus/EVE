import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Color } from "../../common/color";
import { Colors } from "../../renderer/colors";
import { RenderMode } from "../../renderer/renderer";
import { SimulationContext } from "./simulation";

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

    lifetime: [
        {label: 'Older', color: Colors.lifetimeMin},
        {label: 'Younger', color: Colors.lifetimeMax},
    ],

    energy: [
        {label: 'Less energy', color: Colors.energyMin},
        {label: 'More energy', color: Colors.energyMax},
    ],

    supply: [
        {label: 'Uses organic', color: Colors.supplyOrganic},
        {label: 'Uses photosynthesis', color: Colors.supplyPhotosynthesis},
        {label: 'Uses chemosynthesis', color: Colors.supplyChemosynthesis},
    ],

    genesis: [],
}


export const Legend = observer(() => {
    const {renderer} = useContext(SimulationContext);
    const mode = renderer.getRenderMode();

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