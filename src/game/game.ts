import CellContext from "./cell-context";
import CellFactory from "./cell-factory";
import Grid from "./grid";
import GridIterator from "./grid-iterator";
import { Size } from "./size";

export default class Game {
    private grid: Grid;

    constructor(size: Size, private cellFactory: CellFactory) {
        this.grid = new Grid(size, cellFactory);
    }

    update(): void {
        for (const {x, y, cell} of this.grid) {
            if (! cell.isStatic()) {
                const context = new CellContext(this.grid, x, y);
                cell.update(context);
            }
        }
    }

    getGrid(): Grid {
        return this.grid;
    }
}