import { makeObservable, observable, action, runInAction } from "mobx";
import { createSimulation } from "../../simulation/factory";
import { CellPayload, Simulation, StepData } from "../../simulation/simulation";
import { CellType } from "../../simulation/types/cells";
import { SimulationOptions } from "../../simulation/types/simulation-options";
import { CanvasRenderer } from "./canvas-renderer";
import { SimulationParameters } from "./simulation-parameters";
import { SimulationTabType, SimulationUI } from "./simulation-ui";

const TIMEOUT_DELAY = 4;

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

    @observable
    private selectedCellCoords: [number, number] = null;

    @observable
    private selectedCell: CellType = null;

    private simulation: Simulation;

    private renderer: CanvasRenderer;

    private timeoutId: ReturnType<typeof setTimeout>;

    private parameters: SimulationParameters;

    private ui: SimulationUI;

    constructor(
        private options: SimulationOptions
    ) {
        makeObservable(this);

        this.renderer = new CanvasRenderer(this);
        this.parameters = new SimulationParameters(this);
        this.ui = new SimulationUI();

        createSimulation(options).then((simulation) => {
            this.simulation = simulation;

            this.renderer.update().then(() => {
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
            this.step().then(() => {
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
        this.step().then(() => {
            this.renderer.update();
        })
    }

    getState(payload: CellPayload): Promise<StepData> {
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

    @action
    selectCell(x: number, y: number): void {
        this.selectedCellCoords = [x, y];
        this.simulation.getCell(x, y).then((cell) => {
            runInAction(() => {
                this.selectedCell = cell; 
            });
            this.ui.openTab(SimulationTabType.CELL);
        });
    }

    getSelectedCellCoords(): [number, number] {
        return this.selectedCellCoords;
    }

    getSelectedCell(): CellType {
        return this.selectedCell;
    }

    private async step(): Promise<void> {
        const stepStartTime = Date.now();
        const step = await this.simulation.step();
        const organismsCount = await this.simulation.getOrganismsCount();
        
        if (this.selectedCell && this.selectedCell.type === 'organism') {
            const cell = await this.simulation.findCellById(this.selectedCell.id);
            runInAction(() => {
                this.selectedCell = cell;
            });
        }

        runInAction(() => {
            this.stepTime = Date.now() - stepStartTime;
            this.currentStep = step;
            this.organismsCount = organismsCount;
        });
    }
}