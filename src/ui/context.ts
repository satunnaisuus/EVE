import * as React from "react";
import { GameStore } from "./stores/game-store";
import { UIStore } from "./stores/ui-store";

export type AppStore = {
    gameStore: GameStore;
    UIStore: UIStore
}

export const AppContext = React.createContext<AppStore>(null);