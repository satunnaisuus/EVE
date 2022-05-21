import { CellContext } from "./cell/cell-context";
import { CellFactory } from "./cell/cell-factory";
import { SimulationEvents, Event, EndEvent } from "./simulation-events";
import { SimulationParams } from "./simulation-params";
import { Grid } from "./grid";
import { GridLoopType } from "./grid-loop-type";
import { GridSize } from "./grid-size";

export class Simulation {
    private step: number = 0;

    private grid: Grid;

    private timeoutDelay: number = 40;

    private timeoutId: ReturnType<typeof setTimeout>;

    private eventSubscribers: Record<keyof SimulationEvents, ((event: Event) => any)[]>;

    private params: SimulationParams;

    constructor(size: GridSize, loop: GridLoopType, params: SimulationParams, private cellFactory: CellFactory) {
        this.grid = new Grid(this, size, loop, cellFactory);
        this.params = params;

        this.eventSubscribers = {
            preStep: [],
            postStep: [],
            step: [],
            start: [],
            pause: [],
            deleteCell: [],
            insertCell: [],
            end: [],
        };
    }

    nextStep(): void {
        this.fireEvent('preStep');

        for (const {x, y, cell} of this.grid) {
            if (! cell.isStatic()) {
                cell.update(
                    new CellContext(this.grid, x, y, this.cellFactory),
                    this.params
                );
            }
        }

        this.fireEvent('step');

        this.step++;

        this.fireEvent('postStep');
    }

    start(): void {
        if (this.timeoutId) {
            return;
        }

        const simulation = this;

        this.timeoutId = setTimeout(function tick() {
            simulation.nextStep();
            simulation.timeoutId = setTimeout(tick, simulation.timeoutDelay);
        }, this.timeoutDelay);

        this.fireEvent('start');
    }

    pause(): void {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
            this.fireEvent('pause');
        }
    }

    getGrid(): Grid {
        return this.grid;
    }

    getStep(): number {
        return this.step;
    }

    getCellFactory(): CellFactory {
        return this.cellFactory;
    }

    setTimeoutDelay(value: number): void {
        this.timeoutDelay = value;
    }

    subscribe<T extends keyof SimulationEvents>(type: T, callback: (event: Event) => any): void {
        this.eventSubscribers[type].push(callback);
    }

    fireEvent(type: keyof SimulationEvents, event?: Event): void {
        event = event || new Event();
        this.eventSubscribers[type].forEach(callback => callback(event));
    }

    getParams(): SimulationParams {
        return this.params;
    }

    end(): void {
        this.pause();
        this.fireEvent('end');
    }
}