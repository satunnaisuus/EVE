import { observer } from "mobx-react-lite";
import * as React from "react";
import { useContext } from "react";
import { RenderStrategy } from "../../render/canvas-renderer";
import { StoreContext } from "../context";

export const PanelComponent = observer(() => {
    const store = useContext(StoreContext);

    return (
        <div className="panel">
            <div className="form-control">
                <label htmlFor="map_theme">Map theme</label>
                <select value={store.getRenderTheme()} className="form-input" onChange={e => store.changeRenderTheme(e.target.value as RenderStrategy)}>
                    <option value="default">Default</option>
                    <option value="none">None</option>
                    <option value="genesis">Genesis</option>
                    <option value="energy">Energy</option>
                </select>
            </div>
            <div className="form-control">
                <label>Step delay</label>
                <input type="range" min="0" max="1000" step="1" value={store.getStepDelay()} onChange={e => store.changeStepDelay(Number(e.target.value))} />
            </div>
            <div>
                {store.isPaused() && <button className="btn" onClick={() => store.start()}>Start</button>}
                {! store.isPaused() && <button className="btn" onClick={() => store.pause()}>Pause</button>}
            </div>
            <div>
                <button className="btn" onClick={() => store.newGame()}>New simulation</button>
            </div>
        </div>
    );
});