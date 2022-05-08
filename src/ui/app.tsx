import { observer } from "mobx-react-lite";
import * as React from "react";
import { useState } from "react";
import createGame from "../game/game-factory";
import { GameComponent } from "./components/game";
import { PanelComponent } from "./components/panel";
import { StoreContext } from "./context";
import { Store } from './store';

const App = observer(() => {
    const [store] = useState(() => new Store(createGame, {}));

    return (
        <StoreContext.Provider value={store}>
            <div className="layout">
                <GameComponent />
                <PanelComponent />
            </div>
        </StoreContext.Provider>
    );
});

export default App;