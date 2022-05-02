import { Cell } from "./cell";
import { Size } from "./size";

export default class GridIterator {
    private x: number = 0;
    private y: number = 0;

    constructor(
        private cells: Cell[][],
        private size: Size
    ) {

    }

    public next(): {cell: Cell, x: number, y: number} {
        const result = {
            cell: this.cells[this.x][this.y],
            x: this.x,
            y: this.y
        };

        this.x++;

        if (this.x === this.size.getWidth()) {
            this.x = 0;
            this.y++;
        }

        return result;
    }

    public hasNext(): boolean {
        return this.y < this.size.getHeight();
    }
}