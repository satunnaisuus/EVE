import * as React from "react";
import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useSize } from "../hooks/use-size";
import styled from "styled-components";
import { SimulationStore } from "../stores/simulation-store";

const StyledViewport = styled.div`
    
    overflow: hidden;
    flex-grow: 1;
`;

interface Props {
    simulation: SimulationStore;
}

export const Viewport = observer(({simulation}: Props) => {
    const canvasRef = useRef();
    const [width, height, containerRef] = useSize();

    useEffect(() => {
        simulation.getRenderer().setCanvas(canvasRef.current);
        return () => {};
    }, [canvasRef.current]);

    useEffect(() => {
        simulation.getRenderer().requestRedraw();
        return () => {};
    }, [width, height]);

    return (
        <StyledViewport ref={containerRef}>
            <canvas width={width} height={height} ref={canvasRef}></canvas>
        </StyledViewport>
    );
});