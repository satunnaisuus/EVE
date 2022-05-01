import { assertGreaterOrEqualThan, assertLessThan } from "../common/asserts";
import { Cell } from "./cell";
import CellFactory from "./cell-factory";
import { Size } from "./size";

export default class Grid {
    private cells: {[key: `${number}:${number}`]: Cell} = {};

    constructor(
        private size: Size,
        private cellFactory: CellFactory
    ) {
        
    }

    public getSize(): Size {
        return this.size;
    }

    public insert(x: number, y: number, cell: Cell): void {
        assertLessThan(x, this.size.getWidth());
        assertLessThan(y, this.size.getHeight());
        assertGreaterOrEqualThan(x, 0);
        assertGreaterOrEqualThan(y, 0);

        this.cells[`${x}:${y}`] = cell;
    }

    public getCell(x: number, y: number): Cell {
        const cell = this.cells[`${x}:${y}`];

        if (cell) {
            return cell;
        }

        return this.cellFactory.createEmpty();
    }
}