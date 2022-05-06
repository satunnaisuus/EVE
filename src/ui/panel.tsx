import * as React from "react";
import { useState, useEffect } from "react";

interface Props {
    theme: string;
    paused: boolean;
    onChangeTheme: (theme: string) => any;
    onStart: () => any;
    onPause: () => any;
}

export default function Panel(props: Props) {
    const [theme, setTheme] = useState(props.theme);

    useEffect(() => {
        props.onChangeTheme(theme);
    }, [theme]);

    return (
        <div className="panel">
            <div className="form-control">
                <label htmlFor="map_theme">Map theme</label>
                <select value={theme} className="form-input" onChange={e => setTheme(e.target.value)}>
                    <option value="default">Default</option>
                    <option value="none">None</option>
                    <option value="genesis">Genesis</option>
                    <option value="energy">Energy</option>
                </select>
            </div>
            <div>
                {props.paused && <button className="btn" onClick={() => props.onStart()}>Start</button>}
                {! props.paused && <button className="btn" onClick={() => props.onPause()}>Pause</button>}
            </div>
        </div>
    );
} 