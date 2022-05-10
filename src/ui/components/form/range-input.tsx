import * as React from "react";
import styled from "styled-components";

type Props = {
    onChange: (value: number) => any;
    min: number,
    max: number,
    step: number,
    value?: number;
}

const StyledRange = styled.input`
    width: 100%;
`;

export const RangeInput = (props: Props) => (
    <StyledRange
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={e => props.onChange(Number(e.target.value))}
    />
);