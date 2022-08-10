import * as React from "react";
import styled from "styled-components";
import { Flex } from "../flex";
import { FormRow } from "./form-row";
import { RangeInput } from "./range-input";

type Props = {
    label?: string;
    postfix?: string
    onChange: (value: number) => void;
    min: number,
    max: number,
    step: number,
    value?: number;
}

const StyledValue = styled.div`
    font-size: 12px;
    line-height: 1;
    text-align: right;
    min-width: 40px;
    margin-left: 5px;
    font-weight: bold;
`;

const StyledRangeWrapper = styled.div`
    flex-grow: 1;
`;

export const RangeRow = ({label, postfix, min, max, step, value, onChange}: Props) => (
    <FormRow label={label}>
        <Flex align="center">
            <StyledRangeWrapper>
                <RangeInput min={min} max={max} step={step} onChange={onChange} value={value} />
            </StyledRangeWrapper>
            <StyledValue>{value}{postfix}</StyledValue>
        </Flex>
    </FormRow>
);