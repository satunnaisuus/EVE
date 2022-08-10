import { observer } from "mobx-react-lite";
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { loadOptions } from "../storage";
import { CreateSimulationForm } from "./create-simulation-form";
import { Flex } from "./flex";
import { Saves } from "./saves";

type Tab = 'new' | 'load';

const StyledMainMenu = styled.div`
    display: flex;
    max-width: 900px;
    max-height: 600px;
    margin: auto;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: #1d2531;
    overflow: hidden;

    @media (max-width: 900px) {
        flex-direction: column;
        max-height: none;
        border-radius: 0;
    }
`;

const StyledSidebar = styled.div`
    width: 300px;
    background: #151d2b;

    @media (max-width: 900px) {
        width: 100%;
    }
`;

const StyledContent = styled.div`
    height: 100%;
    overflow-y: auto;
    flex-grow: 1;
    padding: 15px;
`;

const StyledTab = styled.button<{active: boolean}>`
    display: block;
    width: 100%;
    padding: 10px;
    text-align: center;
    background: ${({active, theme}) => active ? theme.primary : 'transparent'};
    color: #fff;
    border: none;
`;


export const MainMenu = observer(() => {
    const [currentTab, setCurrentTab] = useState<Tab>('new');

    return (
        <StyledMainMenu>
            <StyledSidebar>
                <StyledTab active={currentTab === 'new'} onClick={() => setCurrentTab('new')}>New simulation</StyledTab>
                <StyledTab active={currentTab === 'load'} onClick={() => setCurrentTab('load')}>Load simulation</StyledTab>
            </StyledSidebar>
            <StyledContent>
                {currentTab === 'new' && <CreateSimulationForm options={loadOptions()} />}
                {currentTab === 'load' && <Saves />}
            </StyledContent>
        </StyledMainMenu>
    );
});