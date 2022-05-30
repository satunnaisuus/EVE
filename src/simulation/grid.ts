import { assertGreaterOrEqualThan, assertGreaterThan, assertLessThan } from "../common/asserts";
import { AbstractCell } from "./cell/abstract-cell";
import { CellFactory } from "./cell/cell-factory";
import { CellType } from "./types/cells";
import { GridLoopType } from "./types/grid-loop-type";

export class Grid {
    private cells: AbstractCell[][] = [];

    constructor(
        private width: number,
        private height: number,
        private loop: GridLoopType,
        private cellFactory: CellFactory
    ) {
        assertGreaterThan(width, 0);
        assertGreaterThan(height, 0);

        for (let x = 0; x < width; x++) {
            this.cells[x] = [];
            for (let y = 0; y < height; y++) {
                this.cells[x][y] = cellFactory.createEmpty();
            }
        }
    }

    insert(x: number, y: number, cell: AbstractCell): void {
        assertLessThan(x, this.width);
        assertLessThan(y, this.height);
        assertGreaterOrEqualThan(x, 0);
        assertGreaterOrEqualThan(y, 0);

        this.cells[x][y] = cell;
    }

    delete(x: number, y: number): void {
        this.cells[x][y] = this.cellFactory.createEmpty();
    }

    getCell(x: number, y: number): AbstractCell {
        return this.cells[x][y];
    }

    getLoopMode(): GridLoopType {
        return this.loop;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    toArray(): AbstractCell[][] {
        return this.cells.map(l => l.slice());
    }

    serialize(): CellType[][] {
        return this.toArray().map((l) => l.map(c => c.serialize()));
    }
}