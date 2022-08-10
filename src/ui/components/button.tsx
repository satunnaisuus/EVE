import { observer } from "mobx-react-lite";
import * as React from "react";
import styled from "styled-components";
import { THEME } from "../theme";

const Apperance = {
    primary: {
        backgroundColor: THEME.primary,
        boderColor: THEME.primary,
        textColor: THEME.color,
    },
    success: {
        backgroundColor: THEME.success,
        boderColor: THEME.success,
        textColor: THEME.color,
    },
    secondary: {
        backgroundColor: THEME.secondary,
        boderColor: THEME.secondary,
        textColor: THEME.color,
    },
};

type Props = {
    children?: React.ReactNode;
    onClick: () => void;
    width?: string;
    apperance?: keyof typeof Apperance;
}

const StyledButton = styled.button<Props>`
    border: 1px solid;
    border-radius: 10px;
    cursor: pointer;
    padding: 10px 16px;
    ${({width}) => width && `width: ${width};`}
    ${({apperance}) => {
        const styles = Apperance[apperance || 'secondary'];
        return (
            `border-color: ${styles.boderColor};` +
            `background-color: ${styles.backgroundColor};` +
            `color: ${styles.textColor};`
        );
    }}
`;

export const Button = observer((props: Props) => (
    <StyledButton {...props}>
        {props.children}
    </StyledButton>
));