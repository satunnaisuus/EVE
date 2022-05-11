import * as React from "react";
import { useEffect, useRef, useContext } from "react";
import { observer } from "mobx-react-lite";
import { useSize } from "../hooks/use-size";
import { AppContext } from "../context";
import styled from "styled-components";

const StyledGame = styled.div`
    flex: 1;
    height: 100%;
    overflow: hidden;
`;

export const GameComponent = observer(() => {
    const canvasRef = useRef();
    const [width, height, containerRef] = useSize();
    const {gameStore} = useContext(AppContext);

    useEffect(() => {
        gameStore.setCanvas(canvasRef.current);
        return () => {};
    }, [canvasRef.current]);
    
    useEffect(() => {
        gameStore.render();
        return () => {};
    }, [width, height]);

    return (
        <StyledGame ref={containerRef}>
            <canvas width={width} height={height} ref={canvasRef}></canvas>
        </StyledGame>
    );
});