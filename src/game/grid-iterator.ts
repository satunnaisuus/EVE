import { Cell } from "./cell";
import Grid from "./grid";

export default class GridIterator {
    private x: number = 0;
    private y: number = 0;

    constructor(private grid: Grid) {

    }

    public next(): {cell: Cell, x: number, y: number} {
        const result = {
            cell: this.grid.getCell(this.x, this.y),
            x: this.x,
            y: this.y
        };

        this.x++;

        if (this.x === this.grid.getSize().getWidth()) {
            this.x = 0;
            this.y++;
        }

        return result;
    }

    public hasNext(): boolean {
        return this.y < this.grid.getSize().getHeight();
    }
}