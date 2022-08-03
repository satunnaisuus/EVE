import * as React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import Eye from '/src/assets/images/organism/organ/eye.svg';

const EyeOrganStyled = styled.div<{direction: number}>`
    width: 22px;
    height: 22px;
    position: absolute; 
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
    margin: auto;
    padding-bottom: 100px;
    transform: rotate(${({direction}) => direction * 45}deg);
    z-index: 3;
`;

export const EyeOrgan = observer(({direction}: {direction: number}) => (
    <EyeOrganStyled direction={direction}>
        <img src={Eye} />
    </EyeOrganStyled>
));