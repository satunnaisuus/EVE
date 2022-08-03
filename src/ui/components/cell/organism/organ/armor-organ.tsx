import * as React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import Armor from '../../../../../../assets/images/organism/organ/armor.svg';

const ArmorOrganStyled = styled.div<{direction: number}>`
    width: 56px;
    height: 12px;
    position: absolute; 
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
    margin: auto;
    padding-bottom: 130px;
    transform: rotate(${({direction}) => direction * 45}deg);
    z-index: 3;
`;

export const ArmorOrgan = observer(({direction}: {direction: number}) => (
    <ArmorOrganStyled direction={direction}>
        <img src={Armor} />
    </ArmorOrganStyled>
));