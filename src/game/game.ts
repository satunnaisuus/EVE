import CellFactory from "./cell-factory";
import Grid from "./grid";
import { Size } from "./size";

export default class Game {
    private grid: Grid;

    constructor(size: Size, private cellFactory: CellFactory) {
        this.grid = new Grid(size, cellFactory);
    }

    update(): void {
        for (const {cell} of this.grid) {
            if (! cell.isStatic()) {
                cell.update();
            }
        }
    }

    getGrid(): Grid {
        return this.grid;
    }
}