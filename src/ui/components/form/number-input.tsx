import * as React from "react";
import styled from "styled-components";
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    onChange: (value: number) => any;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
}

const StyledNumberInput = styled.input`
    width: 100%;
    background: #000;
    border: 2px solid #000;
    padding: 10px 60px 10px 10px;
    border-radius: 10px;
    color: #fff;
`;

const StyledButton = styled.button`
    width: 20px;
    height: 20px;
    background: #30b47b;
    border: 2px solid #30b47b;
    border-radius: 100%;
    color: #fff;
    padding: 0;
    font-size: 14px;
    line-height: 1;
    margin-left: 5px;
`;

const StyledButtonDisabled = styled(StyledButton)`
    opacity: 0.5;
    cursor: default;
`;

const InputWrapper = styled.div`
    position: relative;
`;

const ButtonsWrapper = styled.div`
    position: absolute;
    top: 11px;
    right: 10px;
`;

export const NumberInput = (props: Props) => {
    const [value, setValue] = React.useState(props.value || 0);

    const change = (val: number) => {
        if (props.min !== undefined && val < props.min) {
            val = props.min;
        }

        if (props.max !== undefined && val > props.max) {
            val = props.max;
        }

        setValue(val);
        props.onChange(val);
    }

    let minisComponent = <StyledButton onClick={() => change(value - 1)}><FontAwesomeIcon icon={faMinus} /></StyledButton>;
    let plusComponent = <StyledButton onClick={() => change(value + 1)}><FontAwesomeIcon icon={faPlus} /></StyledButton>;

    if (props.min !== undefined && props.value <= props.min) {
        minisComponent = <StyledButtonDisabled><FontAwesomeIcon icon={faMinus} /></StyledButtonDisabled>;
    }

    if (props.max !== undefined && props.value >= props.max) {
        plusComponent = <StyledButtonDisabled><FontAwesomeIcon icon={faPlus} /></StyledButtonDisabled>;
    }

    const onChangeInput = (value: string) => {
        const numberValue = Number(value);
        change(Number.isSafeInteger(numberValue) ? numberValue : 0)
    }

    return (
        <InputWrapper>
            <StyledNumberInput type="text" value={value} onChange={(e) => onChangeInput(e.target.value)}/>
            <ButtonsWrapper>
                {minisComponent}
                {plusComponent}
            </ButtonsWrapper>
        </InputWrapper>
    );
};