import { makeObservable, observable, action, runInAction } from "mobx";
import { createSimulation } from "../../simulation/factory";
import { Simulation, StepData } from "../../simulation/simulation";
import { SimulationOptions } from "../../simulation/types/simulation-options";
import { saveOptions } from "../storage";
import { CanvasRenderer } from "./canvas-renderer";
import { SimulationOptionsStore } from "./simulation-options-store";

const TIMEOUT_DELAY = 4;

export class SimulationStore {
    @observable
    private paused: boolean = true;

    @observable
    private options: SimulationOptionsStore;

    private simulation: Simulation;

    private renderer: CanvasRenderer;

    private timeoutId: ReturnType<typeof setTimeout>;

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
        this.pause();
        this.simulation && this.simulation.terminate();

        createSimulation(this.options.toGameOptions()).then((simulation) => {
            this.simulation = simulation;

            simulation.getState(['energy']).then((data) => {
                this.renderer.setState(data);
            });
        });
        
        saveOptions(this.options.toGameOptions());
    }

    @action
    pause(): void {
        this.paused = true;
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
    }

    @action
    start(): void {
        if (this.timeoutId) {
            return;
        }

        this.paused = false;
        
        const tick = () => {
            this.simulation.step().then((step) => {
                this.simulation.getState(['energy']).then((data: StepData) => {
                    this.renderer.setState(data);
                    if (! this.paused) {
                        this.timeoutId = setTimeout(tick, TIMEOUT_DELAY);
                    }
                });
            });
            
        }

        this.timeoutId = setTimeout(tick, TIMEOUT_DELAY);
    }

    isPaused(): boolean {
        return this.paused;
    }

    makeStep(): void {
        this.simulation.step().then((step) => {
            this.simulation.getState(['energy']).then((data: StepData) => {
                this.renderer.setState(data);
            });
        });
    }

    getOptions(): SimulationOptionsStore {
        return this.options;
    }

    getRenderer(): CanvasRenderer {
        return this.renderer;
    }
}