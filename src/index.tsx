import * as React from "react";
import { createRoot } from 'react-dom/client';
import { createGame } from "./game/game-factory";
import { App } from "./ui/app";
import { AppContext } from "./ui/context";
import { loadOptions } from "./ui/storage";
import { GameStore } from "./ui/stores/game-store";
import { UIStore } from "./ui/stores/ui-store";
import { GlobalStyle } from "./ui/styles";

const stores = {
    gameStore: new GameStore(createGame, loadOptions()),
    UIStore: new UIStore(),
};
const root = createRoot(document.getElementById('root')!);

root.render(
    <AppContext.Provider value={stores}>
        <GlobalStyle />
        <App />
    </AppContext.Provider>
);