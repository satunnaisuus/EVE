import * as React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import Spine from '/src/assets/images/organism/organ/spine.svg';

const SpineOrganStyled = styled.div<{direction: number}>`
    width: 46px;
    height: 32px;
    position: absolute; 
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
    margin: auto;
    padding-bottom: 170px;
    transform: rotate(${({direction}) => direction * 45}deg);
    z-index: 1;
`;

export const SpineOrgan = observer(({direction}: {direction: number}) => (
    <SpineOrganStyled direction={direction}>
        <img src={Spine} />
    </SpineOrganStyled>
));