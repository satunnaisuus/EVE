import { observer } from "mobx-react-lite";
import * as React from "react";
import styled from "styled-components";

const Apperance = {
    default: {
        backgroundColor: '#000',
        boderColor: '#000',
        textColor: '#fff',
    },
    success: {
        backgroundColor: '#30b47b',
        boderColor: '#30b47b',
        textColor: '#fff',
    },
};

type Props = {
    children?: React.ReactNode;
    onClick: () => any;
    width?: string;
    apperance?: keyof typeof Apperance;
}

const StyledButton = styled.button<Props>`
    border: 1px solid black;
    background: black;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    padding: 10px 20px;
    ${({width}) => width && `width: ${width};`}
    ${({apperance}) => {
        const styles = Apperance[apperance || 'default'];
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