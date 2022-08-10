import * as React from "react";
import { Store } from "./store";
import { GenomeBankStore } from "./stores/genome-bank-store";
import { SaveStore } from "./stores/save-store";
import { SimulationStore } from "./stores/simulation-store";

export const AppContext = React.createContext<Store>(null);
export const SimulationContext = React.createContext<SimulationStore>(null);
export const GenomeBankContext = React.createContext<GenomeBankStore>(null);
export const SaveContext = React.createContext<SaveStore>(null);