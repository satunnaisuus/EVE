import * as React from "react";
import { useState, useCallback, useMemo, useEffect } from "react";
import { WALL_TYPE } from "../game/game-factory";
import GameComponent from "./game";
import Panel from "./panel";

export default function App() {
    const [theme, setTheme] = useState('default');
    const [paused, setPaused] = useState(true);
    const [options, setOptions] = useState({walls: WALL_TYPE.AROUND});

    return (
        <div className="layout">
            <GameComponent theme={theme} paused={paused} options={options} />
            <Panel
                theme={theme} 
                paused={paused}
                onChangeTheme={(theme) => setTheme(theme)}
                onStart={() => setPaused(false)}
                onPause={() => setPaused(true)}
            />
        </div>
    );
} 