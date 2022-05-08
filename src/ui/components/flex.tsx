import * as React from "react";
import styled from "styled-components";

type Props = {
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    justify?: 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'left' | 'right' | 'baseline' | 'space-between' | 'space-around' | 'stretch' | 'space-evenly';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    children: React.ReactNode;
}

const StyledFlex = styled.div<Props>`
    display: flex;
    flex-direction: ${props => props.direction || 'row'};
    justify-content: ${props => props.justify || 'stretch'};
    align-items: ${props => props.align || 'stretch'};
    flex-wrap: ${props => props.wrap || 'nowrap'};
    width: 100%;
`;

export const Flex = (props: Props) => (
    <StyledFlex {...props}>
        {props.children}
    </StyledFlex>
)