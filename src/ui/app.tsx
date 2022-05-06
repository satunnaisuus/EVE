import * as React from "react";
import { useState, useCallback, useMemo, useEffect } from "react";
import { GameOptions, WALL_TYPE } from "../game/game-factory";
import GameComponent from "./game";
import Panel from "./panel";

export default function App() {
    const [theme, setTheme] = useState('default');
    const [paused, setPaused] = useState(true);
    const [stepDelay, setStepDelay] = useState(100);

    return (
        <div className="layout">
            <GameComponent theme={theme} paused={paused} options={options} stepDelay={stepDelay} />
            <Panel
                theme={theme} 
                paused={paused}
                stepDelay={stepDelay}
                onChangeTheme={(theme) => setTheme(theme)}
                onStart={() => setPaused(false)}
                onPause={() => setPaused(true)}
                onChangeStepDelay={(value) => setStepDelay(value)}
            />
        </div>
    );
} 