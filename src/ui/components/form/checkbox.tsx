import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import styled from "styled-components";

type Props = {
    label: string;
    checked?: boolean;
    onChange: (checked: boolean) => void;
}

const StyledCheckbox = styled.div`
    display: flex;
    padding: 3px 0;
`;

const CheckWrapper = styled.div`
    width: 20px;
`;

export const Checkbox = ({label, checked, onChange}: Props) => (
    <StyledCheckbox onClick={() => onChange(! checked)}>
        <CheckWrapper>
            {checked && <FontAwesomeIcon icon={faCheck} />}
        </CheckWrapper>
        {label}
    </StyledCheckbox>
);