import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { CellOrganism, Organ } from "../../../../simulation/types/cells";
import { Body } from "./body";
import { ArmorOrgan } from "./organ/armor-organ";
import { FinOrgan } from "./organ/fin-organ";
import { MouthOrgan } from "./organ/mouth-organ";
import { OxidizerOrgan } from "./organ/oxydizer-organ";
import { SpineOrgan } from "./organ/spine-organ";
import { ChloroplastOrgan } from "./organ/chloroplast-organ";
import { EyeOrgan } from "./organ/eye-organ";

const Container = styled.div`
    width: 200px;
    height: 200px;
    position: relative;
    margin: 0 auto;
`;

export const Visualization = observer(({organism}: {organism: CellOrganism}) => (
    <Container>
        <Body color={organism.genome.color} />
        {organism.genome.organs.map((organ, i) => {
            switch (organ) {
                case Organ.ARMOUR:
                    return <ArmorOrgan key={i} direction={i} />;
                case Organ.FIN:
                    return <FinOrgan key={i} direction={i} />;
                case Organ.MOUTH:
                    return <MouthOrgan key={i} direction={i} />;
                case Organ.OXIDIZER:
                    return <OxidizerOrgan key={i} direction={i} />;
                case Organ.SPINE:
                    return <SpineOrgan key={i} direction={i} />;
                case Organ.CHLOROPLAST:
                    return <ChloroplastOrgan key={i} direction={i} />;
                case Organ.EYE:
                    return <EyeOrgan key={i} direction={i} />;
            }
        })}
    </Container>
));