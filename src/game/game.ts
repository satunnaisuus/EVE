import { shuffle } from "../common/array-utils";
import { CellContext } from "./cell/cell-context";
import { CellFactory } from "./cell/cell-factory";
import { GameEvents, Event } from "./game-events";
import { Grid } from "./grid";
import { GridLoopType } from "./grid-loop-type";
import { GridSize } from "./grid-size";

export type GameParams = {
    plantSpawnRate: number,
};

export class Game {
    private step: number = 0;

    private grid: Grid;

    private timeoutDelay: number = 40;

    private timeoutId: ReturnType<typeof setTimeout>;

    private eventSubscribers: Record<keyof GameEvents, ((event: Event) => any)[]>;

    constructor(size: GridSize, loop: GridLoopType, private params: GameParams, private cellFactory: CellFactory) {
        this.grid = new Grid(this, size, loop, cellFactory);

        this.eventSubscribers = {
            preStep: [],
            postStep: [],
            step: [],
            start: [],
            pause: [],
            deleteCell: [],
            insertCell: [],
        };
    }

    spawsnPlants(): void {
        const coordinates: [number, number][] = [];

        for (const {x, y, cell} of this.grid) {
            if (cell.isEmpty()) {
                coordinates.push([x, y]);
            }
        }

        const count = Math.ceil(coordinates.length * this.params.plantSpawnRate / 100);

        if (count === 0) {
            return;
        }

        for (const [x, y] of shuffle(coordinates).slice(0, count)) {
            this.grid.insert(x, y, this.cellFactory.createPlant());
        }
    }

    nextStep(): void {
        this.fireEvent('preStep');
        
        this.spawsnPlants();

        for (const {x, y, cell} of this.grid) {
            if (! cell.isStatic()) {
                cell.update(
                    new CellContext(this.grid, x, y, this.cellFactory)
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

        const game = this;

        this.timeoutId = setTimeout(function tick() {
            game.nextStep();
            game.timeoutId = setTimeout(tick, game.timeoutDelay);
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

    subscribe<T extends keyof GameEvents>(type: T, callback: (event: Event) => any): void {
        this.eventSubscribers[type].push(callback);
    }

    fireEvent(type: keyof GameEvents, event?: Event): void {
        event = event || new Event();
        this.eventSubscribers[type].forEach(callback => callback(event));
    }

    getParams(): GameParams {
        return this.params;
    }
}