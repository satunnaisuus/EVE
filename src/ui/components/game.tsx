import * as React from "react";
import { useEffect, useRef, useContext } from "react";
import { observer } from "mobx-react-lite";
import { useSize } from "../hooks/use-size";
import { StoreContext } from "../context";

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
        <div ref={containerRef} className="canvas-container">
            <canvas width={width} height={height} ref={canvasRef} className="canvas"></canvas>
        </div>
    );
});