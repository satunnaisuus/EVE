import { makeObservable, observable, action, runInAction } from "mobx";
import { CreateOptions } from "../../simulation/cell/cell-factory";
import { PayloadData } from "../../simulation/data";
import { createSimulation } from "../../simulation/factory";
import { Simulation, StepData } from "../../simulation/simulation";
import { CellType } from "../../simulation/types/cells";
import { SimulationOptions } from "../../simulation/types/simulation-options";
import { CanvasRenderer } from "./canvas-renderer";
import { SelectedCell } from "./selected-cell";
import { SimulationParameters } from "./simulation-parameters";
import { SimulationUI } from "./simulation-ui";

export class SimulationStore {
    @observable
    private paused: boolean = true;

    @observable
    private ready: boolean = false;

    @observable
    private currentStep: number = 0;

    @observable
    private stepTime: number = 0;

    @observable
    private organismsCount: number = 0;

    private simulation: Simulation;

    private canvasRenderer: CanvasRenderer;

    private timeoutId: ReturnType<typeof setTimeout>;

    private parameters: SimulationParameters;

    private ui: SimulationUI;

    private selectedCell: SelectedCell;

    constructor(
        private options: SimulationOptions
    ) {
        makeObservable(this);

        this.canvasRenderer = new CanvasRenderer(this);
        this.parameters = new SimulationParameters(this);
        this.ui = new SimulationUI();
        this.selectedCell = new SelectedCell(this);

        createSimulation(options).then((simulation) => {
            this.simulation = simulation;

            this.canvasRenderer.update(() => {
                runInAction(() => this.ready = true);
            });

            this.simulation.getOrganismsCount().then((count) => {
                runInAction(() => {
                    this.organismsCount = count;
                });
            });
        });
    }

    @action
    pause(): void {
        this.paused = true;
    }

    @action
    start(): void {
        if (this.timeoutId) {
            return;
        }

        this.paused = false;

        const tick = () => {
            this.step().then(() => {
                this.canvasRenderer.update(() => {
                    if (! this.paused) {
                        tick();
                    }
                });
            });
        }

        tick();
    }

    isPaused(): boolean {
        return this.paused;
    }

    isReady(): boolean {
        return this.ready;
    }

    makeStep(): void {
        this.step().then(() => {
            this.canvasRenderer.update();
        })
    }

    getState(payload: PayloadData): Promise<StepData> {
        return this.simulation.getState(payload);
    }

    getOptions(): SimulationOptions {
        return this.options;
    }

    getRenderer(): CanvasRenderer {
        return this.canvasRenderer;
    }

    terminate(): void {
        this.simulation && this.simulation.terminate();
        this.canvasRenderer && this.canvasRenderer.terminate();
    }

    getParameters(): SimulationParameters {
        return this.parameters;
    }

    getSimulation(): Simulation {
        return this.simulation;
    }

    getUI(): SimulationUI {
        return this.ui;
    }

    getCurrentStep(): number {
        return this.currentStep;
    }

    getStepTime(): number {
        return this.stepTime;
    }

    getOrganismsCount(): number {
        return this.organismsCount;
    }

    getWidth(): number {
        return this.simulation.getOptions().width;
    }

    getHeight(): number {
        return this.simulation.getOptions().height;
    }

    getCell(x: number, y: number): Promise<CellType> {
        return this.simulation.getCell(x, y);
    }

    findCellById(id: number): Promise<CellType> {
        return this.simulation.findCellById(id);
    }

    getSelectedCell(): SelectedCell {
        return this.selectedCell;
    }

    replace(coords: [number, number][], type: string, ignore: string[], options: CreateOptions): Promise<void> {
        return this.simulation.replace(coords, type, ignore, options);
    }

    private async step(): Promise<void> {
        const stepStartTime = Date.now();
        const step = await this.simulation.step();
        const organismsCount = await this.simulation.getOrganismsCount();
        this.selectedCell.update();

        runInAction(() => {
            this.stepTime = Date.now() - stepStartTime;
            this.currentStep = step;
            this.organismsCount = organismsCount;
        });
    }
}