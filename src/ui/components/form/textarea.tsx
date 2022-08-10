import * as React from "react";
import styled from "styled-components";

type Props = {
    onChange: (value: string) => void;
    value?: string;
    placeholder?: string;
}

const StyledTextarea = styled.textarea`
    width: 100% !important;
    background: ${props => props.theme.secondary};
    border: 2px solid ${props => props.theme.secondary};
    padding: 10px;
    border-radius: 10px;
    color: ${props => props.theme.color};
`;

export const Textarea = ({value, onChange, placeholder}: Props) => (
    <StyledTextarea onChange={(e) => onChange(e.target.value)} value={value} placeholder={placeholder} />
);