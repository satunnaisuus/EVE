import * as React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { SimulationStore } from "../stores/simulation-store";
import { Button } from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause";
import { faForwardStep } from "@fortawesome/free-solid-svg-icons/faForwardStep";
import { Select } from "./form/select";
import { RenderMode } from "../../renderer/renderer";

const StyledControls = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    overflow-y: auto;
    padding: 0 10px;
    background: #222831;
    height: 70px;
    
`;

interface Props {
    simulation: SimulationStore;
}

const rendererOptions = [
    {label: 'Default', value: 'default'},
    {label: 'Energy', value: 'energy'},
    {label: 'Lifetime', value: 'lifetime'},
];

export const Controls = observer(({simulation}: Props) => {
    const renderer = simulation.getRenderer();

    return (
        <StyledControls>
            {simulation.isReady() && <>
                {simulation.isPaused() &&
                    <>
                        <Button apperance="primary" onClick={() => simulation.start()}>
                            <FontAwesomeIcon icon={faPlay} />
                        </Button>
                        <Button apperance="secondary" onClick={() => simulation.makeStep()}>
                            <FontAwesomeIcon icon={faForwardStep} />
                        </Button>
                    </>
                }
                {! simulation.isPaused() &&
                    <Button apperance="primary" onClick={() => simulation.pause()}>
                        <FontAwesomeIcon icon={faPause} />
                    </Button>
                }
                <Select options={rendererOptions} onSelect={(mode) => {renderer.setMode(mode as RenderMode)}} value={renderer.getMode()} />
            </>}
        </StyledControls>
    );
});