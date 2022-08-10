import * as React from "react";
import styled from "styled-components";

type Props = {
    children?: React.ReactNode;
    onSelect: (value: string) => void;
    options: {label: string; value: string}[];
    value?: string;
}

const StyledSelect = styled.select`
    background: ${props => props.theme.secondary};
    border: 1px solid ${props => props.theme.secondary};
    padding: 10px 10px;
    border-radius: 10px;
    color: ${props => props.theme.color};
`;

export const Select = (props: Props) => (
    <StyledSelect onChange={e => props.onSelect(e.target.value)} value={props.value}>
        {props.options.map(({value, label}, i) => <option value={value} key={i}>{label}</option>)}
    </StyledSelect>
);