import * as React from "react";
import { createRoot } from 'react-dom/client';
import createGame, { GameOptions } from "./game/game-factory";
import { App } from "./ui/app";
import { StoreContext } from "./ui/context";
import { loadOptions } from "./ui/options-storage";
import { Store } from "./ui/store";
import { GlobalStyle } from "./ui/styles";

const store = new Store(createGame, loadOptions());
const root = createRoot(document.getElementById('root')!);

root.render(
    <StoreContext.Provider value={store}>
        <GlobalStyle />
        <App />
    </StoreContext.Provider>
);