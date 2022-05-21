import { assertGreaterOrEqualThan, assertLessThan } from "../common/asserts";
import { AbstractCell } from "./cell/abstract-cell";
import { CellFactory } from "./cell/cell-factory";
import { Simulation } from "./simulation";
import { DeleteCellEvent, InsertCellEvent } from "./simulation-events";
import { GridIterator } from "./grid-iterator";
import { GridLoopType } from "./grid-loop-type";
import { GridSize } from "./grid-size";


export class Grid {
    private cells: {[key: `${number}:${number}`]: AbstractCell} = {};

    constructor(
        private simulation: Simulation,
        private size: GridSize,
        private loop: GridLoopType,
        private cellFactory: CellFactory
    ) {
        
    }

    *[Symbol.iterator]() {
        const iterator = new GridIterator(this.createSnapshot(), this.size);

        while (iterator.hasNext()) {
            yield iterator.next();
        }
    }
    
    getSize(): GridSize {
        return this.size;
    }

    insert(x: number, y: number, cell: AbstractCell): void {
        assertLessThan(x, this.size.getWidth());
        assertLessThan(y, this.size.getHeight());
        assertGreaterOrEqualThan(x, 0);
        assertGreaterOrEqualThan(y, 0);

        this.cells[`${x}:${y}`] = cell;

        this.simulation.fireEvent('insertCell', new InsertCellEvent(
            cell.getType()
        ));
    }

    delete(x: number, y: number): void {
        this.simulation.fireEvent('deleteCell', new DeleteCellEvent(
            this.getCell(x, y).getType()
        ));

        delete this.cells[`${x}:${y}`];
    }

    getCell(x: number, y: number): AbstractCell {
        const cell = this.cells[`${x}:${y}`];

        if (cell) {
            return cell;
        }

        return this.cellFactory.createEmpty();
    }

    countEmpty(): number {
        let result = this.size.getCellCount();

        for (const key in this.cells) {
            if (this.cells[key as `${number}:${number}`].isEmpty()) {
                result--;
            }
        }

        return result;
    }

    getLoopMode(): GridLoopType {
        return this.loop;
    } 

    private createSnapshot(): AbstractCell[][] {
        const result = [];

        for (let x = 0; x < this.size.getWidth(); x++) {
            if (! result[x]) {
                result[x] = [];
            }

            for (let y = 0; y < this.size.getHeight(); y++) {
                result[x][y] = this.getCell(x, y);
            }
        }

        return result;
    }
}