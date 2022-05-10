import * as React from "react";
import styled from "styled-components";

type Props = {
    children?: React.ReactNode;
    label?: string;
}

const StyledFormRow = styled.div`
    margin-bottom: 15px;
`;

const StyledLabel = styled.label`
    margin-bottom: 5px;
    display: block;
    width: 100%;
`;

export const FormRow = (props: Props) => (
    <StyledFormRow>
        {props.label && <StyledLabel>{props.label}</StyledLabel>}
        {props.children}
    </StyledFormRow>
);