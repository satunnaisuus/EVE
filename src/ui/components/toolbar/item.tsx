import * as React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

interface Props {
    focused?: boolean;
    enabled?: boolean;
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
    ${({enabled, theme}) => enabled && `background: ${theme.primary};`}

    
    &:hover {
        ${({enabled}) => ! enabled && `background: #07090d;`}
    }
`;


export const ToolbarItem = observer((props: Props) => {
    return (
        <StyledToolbarItem {...props} />
    );
});