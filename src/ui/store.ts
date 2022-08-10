import { action, makeObservable, observable, runInAction } from "mobx";
import { RenderMode } from "../renderer/renderer";
import { createSimulation, createSimulationFromDump } from "../simulation/factory";
import { Dump } from "../simulation/simulation";
import { SimulationOptions } from "../simulation/types/simulation-options";
import { IndexedBdSaveRepository } from "./repository/indexedbd-save-repository";
import { saveOptions } from "./storage";
import { SaveStore } from "./stores/save-store";
import { SimulationStore } from "./stores/simulation-store";

export class Store {
    @observable
    private simulation: SimulationStore = null;

    private saveStore: SaveStore;

    constructor() {
        makeObservable(this);

        this.saveStore = new SaveStore(this, new IndexedBdSaveRepository());
    }

    @action
    newSimulation(options: SimulationOptions): void {
        createSimulation(options).then((simulation) => {
            runInAction(() => {
                this.closeSimulation();
                this.simulation = new SimulationStore(simulation, this.saveStore);
                saveOptions(options);
            });
        });
    }

    @action
    loadSimulation(save: Dump, renderMode: RenderMode = 'default'): void {
        createSimulationFromDump(save).then((simulation) => {
            runInAction(() => {
                this.closeSimulation();
                this.simulation = new SimulationStore(simulation, this.saveStore);
                this.simulation.getRenderer().setRenderMode(renderMode);
            });
        });
    }

    @action
    closeSimulation(): void {
        this.simulation && this.simulation.terminate();
        this.simulation = null;
    }

    getSaveStore(): SaveStore {
        return this.saveStore;
    }

    getSimulation(): SimulationStore {
        return this.simulation;
    }
}