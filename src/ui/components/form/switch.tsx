import * as React from "react";
import styled from "styled-components";

type Props = {
    onChange: (value: boolean) => any;
    value?: boolean;
    label: string;
}

const StyledLabel = styled.label`
    position: relative;
    display: flex;
    width: 100%;
    cursor: pointer;
    margin-bottom: 15px;
    align-items: center;
`;

const StyledInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + div {
        background-color: ${props => props.theme.primary};
    }

    &:checked + div:before {
        transform: translateX(18px);
    }
`;

const StyledControl = styled.div`
    cursor: pointer;
    width: 40px;
    height: 22px;
    background-color: ${props => props.theme.secondary};
    border-radius: 34px;
    position: relative;
    margin-right: 10px;

    &:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 3px;
        bottom: 3px;
        background: #fff;
        transition: .4s;
        border-radius: 50%;
    }
`;

const StyledLabelText = styled.span`
    flex: 1;
`;

export const Switch = (props: Props) => {
    return (
        <StyledLabel>
            <StyledInput
                type='checkbox'
                checked={props.value}
                onChange={e => props.onChange(e.target.checked)}
            />
            <StyledControl />
            <StyledLabelText>{props.label}</StyledLabelText>
        </StyledLabel>
    );
};