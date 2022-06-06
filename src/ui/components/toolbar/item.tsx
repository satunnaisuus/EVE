import * as React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

interface Props {
    focused?: boolean;
    children?: React.ReactNode;
    onClick?: () => any;
}

const StyledToolbarItem = styled.div<Props>`
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    gap: 5px;
    min-width: 50px;
    height: 100%;
    ${({focused}) => focused && 'background: #07090d;'}

    &:hover {
        background: #07090d;
    }
`;


export const ToolbarItem = observer(({children, onClick, focused}: Props) => {
    return (
        <StyledToolbarItem focused={focused} onClick={onClick}>
            {children}
        </StyledToolbarItem>
    );
});