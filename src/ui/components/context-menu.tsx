import * as React from "react";
import styled from "styled-components";

type MenuProps = {
    children: React.ReactNode;
}

type MunuItemProps = {
    children: React.ReactNode;
    onClick: () => any;
}

const StyledContextMenu = styled.div<MenuProps>`
    display: flex;
    flex-direction: column;
    background: #202c3c;
    margin-top: 10px;
    border-radius: 5px;
    padding: 10px 15px;
    width: 250px;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
`;

const StyledContextMenuItem = styled.div<MunuItemProps>`
    width: 100%;
    background: transparent;
    color: #fff;
    border: none;
    padding: 5px 20px;
    text-align: left;
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 14px;

    &:hover {
        background: rgba(0, 0, 0, .3);
    }
`;

export const ContextMenuItem = (props: MunuItemProps) => (
    <StyledContextMenuItem {...props}>
        {props.children}
    </StyledContextMenuItem>
)

export const ContextMenu = (props: MenuProps) => (
    <StyledContextMenu {...props}>
        {props.children}
    </StyledContextMenu>
)