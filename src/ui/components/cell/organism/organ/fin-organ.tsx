import * as React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import Fin from '/src/assets/images/organism/organ/fin.svg';

const FinOrganStyled = styled.div<{direction: number}>`
    width: 60px;
    height: 44px;
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

export const FinOrgan = observer(({direction}: {direction: number}) => (
    <FinOrganStyled direction={direction}>
        <img src={Fin} />
    </FinOrganStyled>
));