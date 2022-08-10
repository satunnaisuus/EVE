import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import styled from "styled-components";

interface Choice {
    value: any;
    label: string;
}

type Props = {
    choices: Choice[];
    value?: any;
    onChange: (value: any) => any;
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

export const RadioGroup = ({choices, value, onChange}: Props) => (
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