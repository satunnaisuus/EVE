import * as React from "react";
import styled from "styled-components";

type Props = {
    children?: React.ReactNode;
    onSelect: (value: string) => any;
    options: {label: string; value: string}[];
    value?: string;
}

const StyledSelect = styled.select`
    width: 100%;
    background: #000;
    border: 2px solid #000;
    padding: 10px 10px;
    border-radius: 10px;
    color: #fff;
`;

export const Select = (props: Props) => (
    <StyledSelect onChange={e => props.onSelect(e.target.value)} value={props.value}>
        {props.options.map(({value, label}, i) => <option value={value} key={i}>{label}</option>)}
    </StyledSelect>
);