import { assertLessThan } from "../common/asserts";
import UInt from "../common/uint";
import { Cell } from "./cell";
import { EmptyCell } from "./empty-cell";
import { Size } from "./size";

export default class Grid {
    private grid: Cell[][];

    constructor(
        private size: Size
    ) {
        this.initializeGrid();
    }

    public getSize(): Size {
        return this.size;
    }

    public insert(x: UInt, y: UInt, cell: Cell): void {
        assertLessThan(x, this.size.getWidth().getValue());
        assertLessThan(y, this.size.getHeight().getValue());

        this.grid[x.getValue()][y.getValue()] = cell;
    }

    private initializeGrid(): void {
        const grid = [];

        for (let x = 0; x < this.size.getWidth().getValue(); x++) {
            grid[x] = [];

            for (let y = 0; y < this.size.getHeight().getValue(); y++) {
                grid[x][y] = new EmptyCell();
            }
        }

        this.grid = grid;
    }
}