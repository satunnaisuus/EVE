import CellContext from "./cell-context";
import CellFactory from "./cell-factory";
import Grid from "./grid";
import { Size } from "./size";

class Event {
    constructor() {
        
    }
}

export class GameEvents {
    preStep: typeof Event = Event;
    postStep: typeof Event = Event;
    step: typeof Event = Event;
    start: typeof Event = Event;
    pause: typeof Event = Event;
}

export default class Game {
    private step: number = 0;

    private grid: Grid;

    private timeoutDelay: number = 0;

    private timeoutId: ReturnType<typeof setTimeout>;

    private eventSubscribers: Record<keyof GameEvents, ((game: Game) => any)[]>;

    constructor(size: Size, private cellFactory: CellFactory) {
        this.grid = new Grid(size, cellFactory);

        this.eventSubscribers = {
            preStep: [],
            postStep: [],
            step: [],
            start: [],
            pause: [],
        }; 
    }

    generatePlants(): void {
        const countEmpty = this.grid.countEmpty();

        if (countEmpty === 0) {
            return;
        }

        const chance = this.grid.countEmpty() / this.grid.getSize().getCellCount() / 100;

        for (const {x, y, cell} of this.grid) {
            if (cell.isEmpty() && Math.random() < chance) {
                this.grid.insert(x, y, this.cellFactory.createPlant());
            }
        }
    }

    nextStep(): void {
        this.fireEvent('preStep');
        
        this.generatePlants();

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

    subscribe<T extends keyof GameEvents>(type: T, callback: (game: Game) => any): void {
        this.eventSubscribers[type].push(callback);
    }

    private fireEvent(type: keyof GameEvents): void {
        this.eventSubscribers[type].forEach(callback => callback(this));
    }
}