import { makeObservable, observable, action, runInAction } from "mobx";
import { CreateOptions } from "../../simulation/cell/cell-factory";
import { PayloadData } from "../../simulation/data";
import { Simulation, StepData } from "../../simulation/simulation";
import { Cell, CellType } from "../../simulation/types/cells";
import { SimulationOptions } from "../../simulation/types/simulation-options";
import { RendererStore } from "./renderer-store";
import { SaveStore } from "./save-store";
import { SelectedCell } from "./selected-cell";
import { SimulationParametersStore } from "./simulation-parameters-store";
import { SimulationUIStore } from "./simulation-ui-store";

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

    @observable
    private stepDelay = 0;

    private rendererStore: RendererStore;

    private parameters: SimulationParametersStore;

    private ui: SimulationUIStore;

    private selectedCell: SelectedCell;

    private options: SimulationOptions;

    constructor(
        private simulation: Simulation,
        private saveStore: SaveStore
    ) {
        makeObservable(this);

        this.options = this.simulation.getOptions();
        this.rendererStore = new RendererStore(this);
        this.parameters = new SimulationParametersStore(this);
        this.ui = new SimulationUIStore();
        this.selectedCell = new SelectedCell(this);

        simulation.getParameters().then((parameters) => {
            this.parameters.init(parameters);
        });

        this.rendererStore.update(() => {
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
        this.paused = false;

        const tick = () => {
            this.step().then(() => {
                this.rendererStore.update(() => {
                    if (this.paused) {
                        return;
                    }

                    if (this.stepDelay === 0) {
                        tick();
                        return;
                    }
                    
                    setTimeout(tick, this.stepDelay);
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
            this.rendererStore.update();
        })
    }

    getState(payload: PayloadData): Promise<StepData> {
        return this.simulation.getState(payload);
    }

    getOptions(): SimulationOptions {
        return this.options;
    }

    getRendererStore(): RendererStore {
        return this.rendererStore;
    }

    terminate(): void {
        this.simulation && this.simulation.terminate();
        this.rendererStore && this.rendererStore.terminate();
    }

    getParameters(): SimulationParametersStore {
        return this.parameters;
    }

    getSimulation(): Simulation {
        return this.simulation;
    }

    getUI(): SimulationUIStore {
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

    getStepDelay(): number {
        return this.stepDelay;
    }

    setStepDelay(delay: number): void {
        this.stepDelay = delay;
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