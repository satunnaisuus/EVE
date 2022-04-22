import Grid from "./grid";
import { Size } from "./size";

export default class Game {
    private grid: Grid;

    constructor(size: Size) {
        this.grid = new Grid(size);
    }

    update(): void {

    }

    getGrid(): Grid {
        return this.grid;
    }
}