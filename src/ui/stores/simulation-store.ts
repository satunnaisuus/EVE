import { makeObservable, observable, action, runInAction } from "mobx";
import { createSimulation } from "../../simulation/factory";
import { Simulation, StateEvent } from "../../simulation/simulation";
import { SimulationOptions } from "../../simulation/types/simulation-options";
import { WorkerSimulation } from "../../simulation/worker-simulation";
import { saveOptions } from "../storage";
import { CanvasRenderer } from "./canvas-renderer";
import { SimulationOptionsStore } from "./simulation-options-store";

export class SimulationStore {
    @observable
    private paused: boolean = true;

    @observable
    private options: SimulationOptionsStore;

    private state: StateEvent;

    private simulation: Simulation;

    private renderer: CanvasRenderer;

    constructor(
        options: SimulationOptions
    ) {
        makeObservable(this);

        this.options = new SimulationOptionsStore(options);
        this.renderer = new CanvasRenderer(this);

        this.newSimulation();
    }

    @action
    newSimulation(): void {
        this.simulation && this.simulation.terminate();
        this.paused = true;

        createSimulation(this.options.toGameOptions()).then((simulation) => {
            this.simulation = simulation;

            simulation.addEventListener('state', (ev) => {
                this.renderer.setState(ev);
            });
            
            simulation.addEventListener('step', () => {
                this.simulation.requestState(['energy']);
            });

            simulation.requestState(['energy']);
        });
        
        saveOptions(this.options.toGameOptions());
    }

    @action
    pause(): void {
        this.paused = true;
        this.simulation.pause();
    }

    @action
    start(): void {
        this.paused = false;
        this.simulation.start();
    }

    isPaused(): boolean {
        return this.paused;
    }

    makeStep(): void {
        this.simulation.step();
    }

    getOptions(): SimulationOptionsStore {
        return this.options;
    }

    getRenderer(): CanvasRenderer {
        return this.renderer;
    }
}