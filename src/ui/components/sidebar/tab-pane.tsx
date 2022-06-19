import * as React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";


const TabPaneStyled = styled.div`
    width: 250px;
    height: 100%;
    padding: 20px;
    background: rgba(16, 22, 30, .75);
    overflow-y: auto;
`;

interface Props {
    active: boolean;
    children: any;
}

export const TabPane = observer(({children, active}: Props) => {
    return active &&
        <TabPaneStyled>
            {children}
        </TabPaneStyled>
    ;
});