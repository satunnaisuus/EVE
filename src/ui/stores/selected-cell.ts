import { makeObservable, observable, action, runInAction } from "mobx";
import { Cell, CellType } from "../../simulation/types/cells";
import { SimulationStore } from "./simulation-store";
import { SidebarTab } from "./simulation-ui";

export class SelectedCell {
    @observable
    private coords: [number, number] = null;

    @observable
    private cell: Cell = null;

    @observable
    private alive = true;

    constructor(private simulation: SimulationStore) {
        makeObservable(this);
    }

    @action
    select(x: number, y: number): void {
        this.alive = true;
        this.coords = [x, y];

        this.simulation.getCell(x, y).then((cell) => {
            runInAction(() => {
                if (cell && cell.type === CellType.ORGANISM) {
                    runInAction(() => this.cell = cell);
                } else {
                    runInAction(() => this.cell = null);
                }
            });

            this.simulation.getUI().setActiveTab(SidebarTab.CELL);
        });
    }

    update(): void {
        if (this.cell && this.alive && this.cell.type === CellType.ORGANISM) {
            this.simulation.findCellById(this.cell.id).then((cell) => {
                if (cell && cell.type === CellType.ORGANISM) {
                    runInAction(() => this.cell = cell);
                } else {
                    runInAction(() => this.alive = false);
                }
            });
        }
    }

    getCoords(): [number, number] {
        return this.coords;
    }

    getCell(): Cell {
        return this.cell;
    }

    isAlive(): boolean {
        return this.alive;
    }
}