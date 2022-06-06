import * as React from "react";
import { Store } from "./store";
import { SimulationStore } from "./stores/simulation-store";

export const AppContext = React.createContext<Store>(null);
export const SimulationContext = React.createContext<SimulationStore>(null);