import * as React from "react";
import styled from "styled-components";

type Props = {
    gutter?: number;
    children: React.ReactNode;
}

const StyledRow = styled.div<Props>`
    display: flex;
    margin-left: -${props => props.gutter / 2 + 'px'};
    margin-right: -${props => props.gutter / 2 + 'px'};
    flex-wrap: wrap;

    & > * {
        padding: 0 ${props => props.gutter / 2 + 'px'};
    }
`;

export const Row = (props: Props) => (
    <StyledRow gutter={props.gutter || 10}>
        {props.children}
    </StyledRow>
)