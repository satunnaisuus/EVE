import { makeObservable, observable, action, runInAction } from "mobx";
import { createSimulation } from "../../simulation/factory";
import { CellPayload, Simulation, StepData } from "../../simulation/simulation";
import { SimulationOptions } from "../../simulation/types/simulation-options";
import { CanvasRenderer } from "./canvas-renderer";
import { SimulationParameters } from "./simulation-parameters";

const TIMEOUT_DELAY = 4;

export class SimulationStore {
    @observable
    private paused: boolean = true;

    @observable
    private ready: boolean = false;

    private simulation: Simulation;

    private renderer: CanvasRenderer;

    private timeoutId: ReturnType<typeof setTimeout>;

    private parameters: SimulationParameters;

    constructor(
        private options: SimulationOptions
    ) {
        makeObservable(this);

        this.renderer = new CanvasRenderer(this);
        this.parameters = new SimulationParameters(this);

        createSimulation(options).then((simulation) => {
            this.simulation = simulation;

            this.renderer.update().then(() => {
                runInAction(() => this.ready = true);
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
                this.renderer.update().then(() => {
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

    isReady(): boolean {
        return this.ready;
    }

    makeStep(): void {
        let lastTime = Date.now();

        this.simulation.step().then((step) => {
            console.log('step time:', (Date.now() - lastTime));
            lastTime = Date.now();

            const renderStartTime = +Date.now();
            this.renderer.update().then(() => {
                console.log('render time:', Date.now() - renderStartTime);
            });
        });
    }

    getState(payload: CellPayload[]): Promise<StepData> {
        return this.simulation.getState(payload);
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

    getParameters(): SimulationParameters {
        return this.parameters;
    }

    getSimulation(): Simulation {
        return this.simulation;
    }
}