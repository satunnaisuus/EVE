import CellFactory from "./cell-factory";
import Grid from "./grid";
import { Size } from "./size";

export default class Game {
    private grid: Grid;

    constructor(size: Size, private cellFactory: CellFactory) {
        this.grid = new Grid(size, cellFactory);
    }

    update(): void {

    }

    getGrid(): Grid {
        return this.grid;
    }
}