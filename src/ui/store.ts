import { action, computed, makeObservable, observable } from "mobx";
import { SimulationOptions } from "../simulation/types/simulation-options";
import { saveOptions } from "./storage";
import { SimulationStore } from "./stores/simulation-store";
import { UIStore } from "./stores/ui-store";

export class Store {
    @observable
    private simulation: SimulationStore = null;

    @observable
    private ui: UIStore = new UIStore();

    constructor() {
        makeObservable(this);
    }

    @action
    newSimulation(options: SimulationOptions): void {
        this.simulation && this.simulation.terminate();
        this.simulation = new SimulationStore(options);
        saveOptions(options);
    }

    getSimulation(): SimulationStore {
        return this.simulation;
    }

    getUI(): UIStore {
        return this.ui;
    }
}