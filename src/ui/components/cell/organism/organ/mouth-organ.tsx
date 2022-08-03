import * as React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import Mouth from '/src/assets/images/organism/organ/mouth.svg';

const MouthOrganStyled = styled.div<{direction: number}>`
    width: 42px;
    height: 45px;
    position: absolute; 
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
    margin: auto;
    padding-bottom: 190px;
    transform: rotate(${({direction}) => direction * 45}deg);
    z-index: 1;
`;

export const MouthOrgan = observer(({direction}: {direction: number}) => (
    <MouthOrganStyled direction={direction}>
        <img src={Mouth} />
    </MouthOrganStyled>
));