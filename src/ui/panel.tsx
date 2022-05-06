import * as React from "react";
import { useState, useEffect } from "react";
import { GameOptions } from "../game/game-factory";

interface Props {
    theme: string;
    paused: boolean;
    stepDelay: number;
    onChangeTheme: (theme: string) => any;
    onStart: () => any;
    onPause: () => any;
    onChangeStepDelay: (value: number) => any;
}

export default function Panel(props: Props) {
    const [theme, setTheme] = useState(props.theme);
    const [stepDelay, setStepDelay] = useState(props.stepDelay);

    const changeTheme = (value: string) => {
        setTheme(value);
        props.onChangeTheme(value);
    }

    const changeStepDelay = (value: number) => {
        setStepDelay(value);
        props.onChangeStepDelay(value);
    }

    return (
        <div className="panel">
            <div className="form-control">
                <label htmlFor="map_theme">Map theme</label>
                <select value={theme} className="form-input" onChange={e => changeTheme(e.target.value)}>
                    <option value="default">Default</option>
                    <option value="none">None</option>
                    <option value="genesis">Genesis</option>
                    <option value="energy">Energy</option>
                </select>
            </div>
            <div className="form-control">
                <label>Step delay</label>
                <input type="range" min="0" max="1000" step="1" onChange={e => changeStepDelay(Number(e.target.value))} />
            </div>
            <div>
                {props.paused && <button className="btn" onClick={() => props.onStart()}>Start</button>}
                {! props.paused && <button className="btn" onClick={() => props.onPause()}>Pause</button>}
            </div>
        </div>
    );
} 