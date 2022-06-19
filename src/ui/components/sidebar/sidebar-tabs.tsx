import * as React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useContext } from "react";
import { SimulationContext } from "../../context";
import { faCogs } from "@fortawesome/free-solid-svg-icons/faCogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimulationTabType } from "../../stores/simulation-ui";

const StyledSidebarTabs = styled.div`
    width: 50px;
    height: 100%;
    overflow-y: auto;
    background: rgba(16, 22, 30, .5);
`;

const StyledSidebarTab = styled.div<{active: boolean}>`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({active}) => active && 'background: #5285eb;'}
    ${({active}) => ! active && `
        &:hover {
            background: #1f3051;
        }
    `}
`;

interface Props {
    
}

export const SidebarTabs = observer(({}: Props) => {
    const simulation = useContext(SimulationContext);
    const ui = simulation.getUI();
    const openedTab = ui.getOpenedTab();

    const toggleTab = (tab: SimulationTabType) => {
        if (openedTab && tab === openedTab) {
            return ui.closeTab();
        }

        ui.openTab(tab);
    }

    return (
        <StyledSidebarTabs>
            <StyledSidebarTab onClick={() => toggleTab(SimulationTabType.PARAMETERS)} active={openedTab === SimulationTabType.PARAMETERS}>
                <FontAwesomeIcon icon={faCogs} />
            </StyledSidebarTab>
        </StyledSidebarTabs>
    );
});