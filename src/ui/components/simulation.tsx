import * as React from "react";
import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useSize } from "../hooks/use-size";
import styled from "styled-components";
import { SimulationStore } from "../stores/simulation-store";
import { Button } from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause";
import { faForwardStep } from "@fortawesome/free-solid-svg-icons/faForwardStep";

const StyledSimulation = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
`;

const Controls = styled.div`
    position: absolute;
    top: 15px;
    left: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

interface Props {
    simulation: SimulationStore;
}

export const SimulationComponent = observer(({simulation}: Props) => {
    const canvasRef = useRef();
    const [width, height, containerRef] = useSize();

    useEffect(() => {
        simulation.getRenderer().setCanvas(canvasRef.current);
        return () => {};
    }, [canvasRef.current]);

    return (
        <StyledSimulation ref={containerRef}>
            <canvas width={width} height={height} ref={canvasRef}></canvas>
            <Controls>
                {simulation.isPaused() &&
                    <>
                        <Button apperance="success" onClick={() => simulation.start()}>
                            <FontAwesomeIcon icon={faPlay} />
                        </Button>
                        <Button apperance="secondary" onClick={() => simulation.makeStep()}>
                            <FontAwesomeIcon icon={faForwardStep} />
                        </Button>
                    </>
                }
                {! simulation.isPaused() &&
                    <Button apperance="success" onClick={() => simulation.pause()}>
                        <FontAwesomeIcon icon={faPause} />
                    </Button>
                }
            </Controls>
        </StyledSimulation>
    );
});