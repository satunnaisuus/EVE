import * as React from "react";
import { useEffect, useRef, useContext } from "react";
import { observer } from "mobx-react-lite";
import { useSize } from "../hooks/use-size";
import { AppContext } from "../context";
import styled from "styled-components";

const StyledSimulation = styled.div`
    flex: 1;
    height: 100%;
    overflow: hidden;
`;

export const SimulationComponent = observer(() => {
    const canvasRef = useRef();
    const [width, height, containerRef] = useSize();
    const {simulationStore} = useContext(AppContext);

    useEffect(() => {
        simulationStore.getRenderer().setCanvas(canvasRef.current);
        return () => {};
    }, [canvasRef.current]);

    return (
        <StyledSimulation ref={containerRef}>
            <canvas width={width} height={height} ref={canvasRef}></canvas>
        </StyledSimulation>
    );
});