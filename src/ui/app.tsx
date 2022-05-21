import { observer } from "mobx-react-lite";
import * as React from "react";
import styled from "styled-components";
import { Flex } from "./components/flex";
import { SimulationComponent } from "./components/simulation";
import { SidebarComponent } from "./components/sidebar";

const StyledApp = styled.div`
    height: 100vh;
    background: #000;
    display: flex;
    color: #fff;
`;

export const App = observer(() => (
    <StyledApp>
        <Flex>
            <SimulationComponent />
            <SidebarComponent />
        </Flex>
    </StyledApp>
));