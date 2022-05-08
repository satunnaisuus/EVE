import * as React from "react";
import { useEffect, useRef, useContext } from "react";
import { observer } from "mobx-react-lite";
import { useSize } from "../hooks/use-size";
import { StoreContext } from "../context";
import styled from "styled-components";

const StyledGame = styled.div`
    flex: 1;
    height: 100%;
    overflow: hidden;
`;

export const GameComponent = observer(() => {
    const canvasRef = useRef();
    const [width, height, containerRef] = useSize();
    const store = useContext(StoreContext);

    useEffect(() => {
        store.setCanvas(canvasRef.current);
        return () => {};
    }, [canvasRef.current]);
    
    useEffect(() => {
        store.render();
        return () => {};
    }, [width, height]);

    return (
        <StyledGame ref={containerRef}>
            <canvas width={width} height={height} ref={canvasRef}></canvas>
        </StyledGame>
    );
});