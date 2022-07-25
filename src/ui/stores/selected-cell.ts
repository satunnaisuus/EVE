import { makeObservable, observable, action, runInAction } from "mobx";
import { CellType, OrganismAction } from "../../simulation/types/cells";
import { SimulationStore } from "./simulation-store";

export class SelectedCell {
    @observable
    private coords: [number, number] = null;

    @observable
    private cell: CellType = null;

    @observable
    private history: OrganismAction[] = [];

    @observable
    private alive: boolean = true;

    constructor(private simulation: SimulationStore) {
        makeObservable(this);
    }

    @action
    select(x: number, y: number): void {
        this.alive = true;
        this.coords = [x, y];
        this.history = [];

        this.simulation.getCell(x, y).then((cell) => {
            runInAction(() => {
                if (cell && cell.type === 'organism') {
                    runInAction(() => {
                        this.cell = cell;
                    });
                } else {
                    runInAction(() => {
                        this.cell = null;
                    });
                }
            });

            this.simulation.getUI().setActiveTab('cell');
        });
    }

    update(): void {
        if (this.cell && this.alive && this.cell.type === 'organism') {
            this.simulation.findCellById(this.cell.id).then((cell) => {
                if (cell && cell.type === 'organism') {
                    runInAction(() => {
                        this.cell = cell;
                    });
                } else {
                    runInAction(() => {
                        this.alive = false; 
                    });
                }
            });
        }
    }

    getCoords(): [number, number] {
        return this.coords;
    }

    getCell(): CellType {
        return this.cell;
    }

    getHistory(): OrganismAction[] {
        return this.history;
    }

    isAlive(): boolean {
        return this.alive;
    }
}