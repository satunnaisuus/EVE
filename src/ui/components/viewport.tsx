import * as React from "react";
import { useContext, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useSize } from "../hooks/use-size";
import styled from "styled-components";
import { SimulationStore } from "../stores/simulation-store";
import { SimulationContext } from "../context";

const StyledViewport = styled.div`
    overflow: hidden;
    flex-grow: 1;
`;

interface Props {
    
}

export const Viewport = observer(({}: Props) => {
    const simulation = useContext(SimulationContext);
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