import { makeObservable, observable, action, runInAction } from "mobx";
import { CreateOptions } from "../../simulation/cell/cell-factory";
import { PayloadData } from "../../simulation/data";
import { Simulation, StepData } from "../../simulation/simulation";
import { Cell, CellType } from "../../simulation/types/cells";
import { SimulationOptions } from "../../simulation/types/simulation-options";
import { CanvasRenderer } from "./canvas-renderer";
import { SaveStore } from "./save-store";
import { SelectedCell } from "./selected-cell";
import { SimulationParametersStore } from "./simulation-parameters-store";
import { SimulationUI } from "./simulation-ui";

export class SimulationStore {
    @observable
    private paused = true;

    @observable
    private ready = false;

    @observable
    private currentStep = 0;

    @observable
    private stepTime = 0;

    @observable
    private organismsCount = 0;

    private canvasRenderer: CanvasRenderer;

    private timeoutId: ReturnType<typeof setTimeout>;

    private parameters: SimulationParametersStore;

    private ui: SimulationUI;

    private selectedCell: SelectedCell;

    private options: SimulationOptions;

    constructor(
        private simulation: Simulation,
        private saveStore: SaveStore
    ) {
        makeObservable(this);

        this.options = this.simulation.getOptions();
        this.canvasRenderer = new CanvasRenderer(this);
        this.parameters = new SimulationParametersStore(this);
        this.ui = new SimulationUI();
        this.selectedCell = new SelectedCell(this);

        simulation.getParameters().then((parameters) => {
            this.parameters.init(parameters);
        });

        this.canvasRenderer.update(() => {
            runInAction(() => this.ready = true);
        });

        this.simulation.getOrganismsCount().then((count) => {
            runInAction(() => this.organismsCount = count);
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

    getParameters(): SimulationParametersStore {
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

    getCell(x: number, y: number): Promise<Cell> {
        return this.simulation.getCell(x, y);
    }

    findCellById(id: number): Promise<Cell> {
        return this.simulation.findCellById(id);
    }

    getSelectedCell(): SelectedCell {
        return this.selectedCell;
    }

    replace(coords: [number, number][], type: CellType, ignore: CellType[], options: CreateOptions): Promise<void> {
        return this.simulation.replace(coords, type, ignore, options);
    }

    async save(): Promise<void> {
        const dump = await this.simulation.dump();

        await this.saveStore.addSave(
            this.saveStore.createItem(dump),
            dump
        );
    }

    private async step(): Promise<void> {
        const stepStartTime = Date.now();
        const step = await this.simulation.makeStep();
        const organismsCount = await this.simulation.getOrganismsCount();
        this.selectedCell.update();

        runInAction(() => {
            this.stepTime = Date.now() - stepStartTime;
            this.currentStep = step;
            this.organismsCount = organismsCount;
        });
    }
}