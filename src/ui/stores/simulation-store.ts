import { makeObservable, observable, action, runInAction } from "mobx";
import { createSimulation } from "../../simulation/factory";
import { Simulation, StepData } from "../../simulation/simulation";
import { SimulationOptions } from "../../simulation/types/simulation-options";
import { CanvasRenderer } from "./canvas-renderer";

const TIMEOUT_DELAY = 4;

export class SimulationStore {
    @observable
    private paused: boolean = true;

    private simulation: Simulation;

    private renderer: CanvasRenderer;

    private timeoutId: ReturnType<typeof setTimeout>;

    constructor(
        private options: SimulationOptions
    ) {
        makeObservable(this);
        this.renderer = new CanvasRenderer(this);

        createSimulation(options).then((simulation) => {
            this.simulation = simulation;

            simulation.getState(['energy']).then((data) => {
                this.renderer.setState(data);
            });
        });
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

    getOptions(): SimulationOptions {
        return this.options;
    }

    getRenderer(): CanvasRenderer {
        return this.renderer;
    }

    terminate(): void {
        this.simulation && this.simulation.terminate();
        this.renderer && this.renderer.terminate();
    }
}