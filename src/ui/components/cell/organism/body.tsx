import * as React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

const BodyStyled = styled.div<{color: string}>`
    width: 120px;
    height: 120px;
    background: ${({color}) => color};
    position: absolute; 
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
    margin: auto; 
    border-radius: 100%;
    z-index: 2;
`;

export const Body = observer(({color}: {color: string}) => (
    <BodyStyled color={color}>
        
    </BodyStyled>
));