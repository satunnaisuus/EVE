import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import styled from "styled-components";

interface Choice<T> {
    value: T;
    label: string;
}

interface Props<T> {
    choices: Choice<T>[];
    value?: T;
    onChange: (value: T) => void;
}

const StyledRadioGroup = styled.div`
    
`;

const StyledRadioGroupItem = styled.div`
    display: flex;
    padding: 3px 0;
`;

const CheckWrapper = styled.div`
    width: 20px;
`;

export const RadioGroup = <T, >({choices, value, onChange}: Props<T>) => (
    <StyledRadioGroup>
        {choices.map((item, index) => (
            <StyledRadioGroupItem key={index} onClick={() => onChange(item.value)}>
                <CheckWrapper>
                    {value === item.value && <FontAwesomeIcon icon={faCheck} />}
                </CheckWrapper>
                {item.label}
            </StyledRadioGroupItem>
        ))}
    </StyledRadioGroup>
);