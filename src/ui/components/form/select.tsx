import * as React from "react";
import styled from "styled-components";

type Props = {
    children?: React.ReactNode;
    onSelect: (value: string) => any;
    options: {label: string; value: string}[];
    value?: string;
}

const StyledSelect = styled.select`
    background: #393E46;
    border: 2px solid #393E46;
    padding: 10px 10px;
    border-radius: 10px;
    color: #f8f2ec;
`;

export const Select = (props: Props) => (
    <StyledSelect onChange={e => props.onSelect(e.target.value)} value={props.value}>
        {props.options.map(({value, label}, i) => <option value={value} key={i}>{label}</option>)}
    </StyledSelect>
);