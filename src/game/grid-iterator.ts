import { AbstractCell } from "./cell/abstract-cell";
import { GridSize } from "./grid-size";

export class GridIterator {
    private x: number = 0;
    private y: number = 0;

    constructor(
        private cells: AbstractCell[][],
        private size: GridSize
    ) {

    }

    next(): {cell: AbstractCell, x: number, y: number} {
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

    hasNext(): boolean {
        return this.y < this.size.getHeight();
    }
}