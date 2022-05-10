import * as React from "react";
import styled from "styled-components";

type Props = {
    onChange: (value: number) => any;
    value?: number;
}

const StyledNumberInput = styled.input`
    width: 100%;
    background: #000;
    border: 2px solid #000;
    padding: 10px 10px;
    border-radius: 10px;
    color: #fff;
`;

export const NumberInput = (props: Props) => {
    return <StyledNumberInput
        type="number"
        value={props.value}
        onChange={e => props.onChange(Math.abs(Number(e.target.value)))}
    />;
};