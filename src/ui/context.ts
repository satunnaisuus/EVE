import * as React from "react";
import { SimulationStore } from "./stores/simulation-store";
import { UIStore } from "./stores/ui-store";

export type AppStore = {
    simulationStore: SimulationStore;
    UIStore: UIStore
}

export const AppContext = React.createContext<AppStore>(null);