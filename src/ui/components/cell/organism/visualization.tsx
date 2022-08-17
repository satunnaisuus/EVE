import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { Organ } from "../../../../simulation/types/cells";
import { Body } from "./body";
import { ArmorOrgan } from "./organ/armor-organ";
import { FinOrgan } from "./organ/fin-organ";
import { MouthOrgan } from "./organ/mouth-organ";
import { OxidizerOrgan } from "./organ/oxydizer-organ";
import { SpineOrgan } from "./organ/spine-organ";
import { ChloroplastOrgan } from "./organ/chloroplast-organ";
import { EyeOrgan } from "./organ/eye-organ";
import { GenomeSerialized } from "../../../../simulation/types/cells";
import { ReproductorOrgan } from "./organ/reproductor-organ";
import { FermenterOrgan } from "./organ/fermenter-organ";

const Container = styled.div`
    width: 200px;
    height: 200px;
    position: relative;
    margin: 0 auto;
`;

export const Visualization = observer(({genome}: {genome: GenomeSerialized}) => (
    <Container>
        <Body color={genome.color} />
        {genome.organs.map((organ, i) => {
            switch (organ) {
                case Organ.ARMOUR:
                    return <ArmorOrgan key={i} direction={i} />;
                case Organ.FIN:
                    return <FinOrgan key={i} direction={i} />;
                case Organ.MOUTH:
                    return <MouthOrgan key={i} direction={i} />;
                case Organ.OXIDIZER:
                    return <OxidizerOrgan key={i} direction={i} />;
                case Organ.FERMENTER:
                    return <FermenterOrgan key={i} direction={i} />;
                case Organ.REPRODUCTOR:
                    return <ReproductorOrgan key={i} direction={i} />;
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