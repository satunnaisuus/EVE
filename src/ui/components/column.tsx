import * as React from "react";
import styled from "styled-components";

type Props = {
    size?: number;
    width?: number;
    children?: React.ReactNode;
}

const StyledColumn = styled.div<Props>`
    ${({width, size}) => !width && !size ? 'flex-grow: 1;' : null}
    ${({width, size}) => !width && size ? `width: calc(${size / 12 * 100}%);` : null}
    ${({width}) => width ? `width: ${width}px;` : null}
`;

export const Column = (props: Props) => (
    <StyledColumn {...props}>
        {props.children}
    </StyledColumn>
)