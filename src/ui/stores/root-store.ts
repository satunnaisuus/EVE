import { action, makeObservable, observable, runInAction } from "mobx";
import { createContext } from "react";
import { RenderMode } from "../../renderer/renderer";
import { createSimulation, createSimulationFromDump } from "../../simulation/factory";
import { Dump } from "../../simulation/simulation";
import { SimulationOptions } from "../../simulation/types/simulation-options";
import { IndexedBdGenomeRepository } from "../repository/indexedbd-genome-repository";
import { IndexedBdSaveRepository } from "../repository/indexedbd-save-repository";
import { saveOptions } from "../storage";
import { GenomeStore } from "./genome-store";
import { SaveStore } from "./save-store";
import { SimulationStore } from "./simulation-store";

export const RootStoreContext = createContext<RootStore>(null);

export class RootStore {
    @observable
    private simulationStore: SimulationStore = null;

    private saveStore: SaveStore;

    private genomeStore: GenomeStore;

    constructor() {
        makeObservable(this);

        this.saveStore = new SaveStore(this, new IndexedBdSaveRepository());
        this.genomeStore = new GenomeStore(new IndexedBdGenomeRepository())
    }

    @action
    newSimulation(options: SimulationOptions, paused: boolean): void {
        createSimulation(options).then((simulation) => {
            runInAction(() => {
                this.closeSimulation();
                this.simulationStore = new SimulationStore(simulation, this.saveStore, paused);
                saveOptions(options);
            });
        });
    }

    @action
    loadSimulation(save: Dump, renderMode: RenderMode = 'default'): void {
        createSimulationFromDump(save).then((simulation) => {
            runInAction(() => {
                this.closeSimulation();
                this.simulationStore = new SimulationStore(simulation, this.saveStore);
                this.simulationStore.getRendererStore().setRenderMode(renderMode);
            });
        });
    }

    @action
    closeSimulation(): void {
        this.simulationStore && this.simulationStore.terminate();
        this.simulationStore = null;
    }

    getSaveStore(): SaveStore {
        return this.saveStore;
    }

    getGenomeStore(): GenomeStore {
        return this.genomeStore;
    }

    getSimulationStore(): SimulationStore {
        return this.simulationStore;
    }
}