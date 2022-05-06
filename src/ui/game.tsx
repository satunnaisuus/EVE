import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Game from "../game/game";
import createGame, { GameOptions } from "../game/game-factory";
import CanvasRenderer, { RenderStrategy } from "../render/canvas-renderer";
import useSize from "./hooks/use-size";

interface Props {
    theme: string;
    paused: boolean;
    stepDelay: number;
    options: GameOptions;
}

export default function GameComponent(props: Props) {
    const canvasRef = useRef();
    const [width, height, containerRef] = useSize();
    const [game, setGame] = useState<Game>();
    const [renderer, setRenderer] = useState<CanvasRenderer>();

    useEffect(() => {
        const game = createGame(props.options);
        setGame(game);
        ! props.paused && game.start();
        game.setTimeoutDelay(props.stepDelay);
        return () => game.pause();
    }, [props.options]);

    useEffect(() => {
        if (canvasRef.current && game) {
            const renderer = new CanvasRenderer(canvasRef.current, game, props.theme as RenderStrategy);
            game.subscribe('step', (game) => renderer.render());
            setRenderer(renderer);
        }

        return () => {};
    }, [game, canvasRef.current]);
    
    useEffect(() => {
        renderer && renderer.render();
        return () => {};
    }, [renderer, width, height]);

    useEffect(() => {
        if (renderer) {
            renderer.setRenderStrategy(props.theme as RenderStrategy);
            renderer.render();
        }
        return () => {};
    }, [props.theme]);

    useEffect(() => {
        game && (props.paused ? game.pause() : game.start());
        return () => {};
    }, [props.paused]);

    useEffect(() => {
        game && game.setTimeoutDelay(props.stepDelay);
        return () => {};
    }, [props.stepDelay]);

    return (
        <div ref={containerRef} className="canvas-container">
            <canvas width={width} height={height} ref={canvasRef} className="canvas"></canvas>
        </div>
    );
} 