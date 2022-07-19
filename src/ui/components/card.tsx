import * as React from "react";
import styled from "styled-components";

type Props = {
    children?: React.ReactNode;
}

const StyledCard = styled.div<Props>`
    border-radius: 10px;
    background: ${props => props.theme.background};
    padding: 15px;
    max-height: 100%;
    overflow-y: auto;

    & + & {
        margin-top: 10px;
    }
`;

export const Card = (props: Props) => (
    <StyledCard {...props}>
        {props.children}
    </StyledCard>
)