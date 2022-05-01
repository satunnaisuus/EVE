import { assertGreaterOrEqualThan, assertLessThan } from "../common/asserts";
import { Cell } from "./cell";
import { EmptyCell } from "./empty-cell";
import { Size } from "./size";
import { WallCell } from "./wall";

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

    public insert(x: number, y: number, cell: Cell): void {
        assertLessThan(x, this.size.getWidth());
        assertLessThan(y, this.size.getHeight());
        assertGreaterOrEqualThan(x, 0);
        assertGreaterOrEqualThan(y, 0);

        this.grid[x][y] = cell;
    }

    public getCell(x: number, y: number): Cell {
        return this.grid[x][y];
    }

    private initializeGrid(): void {
        const grid = [];

        for (let x = 0; x < this.size.getWidth(); x++) {
            grid[x] = [];

            for (let y = 0; y < this.size.getHeight(); y++) {
                grid[x][y] = x === 0 || y === 0 || x === this.size.getWidth() - 1 || y === this.size.getHeight() - 1 ? new WallCell() : new EmptyCell();
            }
        }

        this.grid = grid;
    }
}