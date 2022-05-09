import { observer } from "mobx-react-lite";
import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { RenderStrategy } from "../../render/canvas-renderer";
import { StoreContext } from "../context";
import { Button } from "./button";
import { Card } from "./card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faPlay, faPause, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { Row } from "./row";
import { Column } from "./column";
import { FormRow } from "./form-row";
import { Select } from "./select";
import { Range } from "./range";

const StyledSidebar = styled.div`
    width: 300px;
    padding: 10px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        overflow: visible;
        width: 3px;
    }

    &::-webkit-scrollbar:hover {
        width: 10px;
    }
     
    &::-webkit-scrollbar-thumb {
        background-color: #fff;
    }
`;

const renderThemes = [
    {label: 'Default', value: 'default'},
    {label: 'Genesis', value: 'genesis'},
    {label: 'Energy', value: 'energy'},
    {label: 'Disable rendering', value: 'none'},
]

export const SidebarComponent = observer(() => {
    const store = useContext(StoreContext);

    return (
        <StyledSidebar>
            <Card>
                <FormRow label="Map theme">
                    <Select onSelect={(value) => store.changeRenderTheme(value as RenderStrategy)} options={renderThemes} value={store.getRenderTheme()} />
                </FormRow>
                <FormRow label="Step delay">
                    <Range min={1} max={1000} step={1} onChange={(value) => store.changeStepDelay(value)} value={store.getStepDelay()} />
                </FormRow>
                <Row>
                    <Column>
                        {store.isPaused() &&
                            <Button apperance="success" width="100%" onClick={() => store.start()}>
                                <FontAwesomeIcon icon={faPlay} /> Start
                            </Button>
                        }
                        {! store.isPaused() &&
                            <Button width="100%" onClick={() => store.pause()}>
                                <FontAwesomeIcon icon={faPause} /> Pause
                            </Button>
                        }
                    </Column>
                    <Column width={70}>
                        <Button width="100%" onClick={() => store.makeStep()}>
                            <FontAwesomeIcon icon={faForwardStep} />
                        </Button>
                    </Column>
                </Row>
                <div>
                    
                </div>
            </Card>
            <Card>
                <div>Step: {store.getStep()}</div>
                <div>Steps per second: {store.getStepsPerSecond()}</div>
                <div>Organisms: {store.getOrganismCount()}</div>
            </Card>
            <Card>
                <Row>
                    <Column>
                        <Button width="100%" onClick={() => store.newGame()}>New simulation</Button>
                    </Column>
                    <Column width={60}>
                        <Button width="100%" onClick={() => store.newGame()}>
                            <FontAwesomeIcon icon={faGear} />
                        </Button>
                    </Column>
                </Row>
            </Card>
        </StyledSidebar>
    );
});