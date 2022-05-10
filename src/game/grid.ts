import { assertGreaterOrEqualThan, assertLessThan } from "../common/asserts";
import { Cell } from "./cell";
import CellFactory from "./cell-factory";
import Game from "./game";
import { DeleteCellEvent, InsertCellEvent } from "./game-events";
import GridIterator from "./grid-iterator";
import { Size } from "./size";

export type LoopType = 'none' | 'full' | 'vertical' | 'horizontal';

export default class Grid {
    private cells: {[key: `${number}:${number}`]: Cell} = {};

    constructor(
        private game: Game,
        private size: Size,
        private loop: LoopType,
        private cellFactory: CellFactory
    ) {
        
    }

    *[Symbol.iterator]() {
        const iterator = new GridIterator(this.createSnapshot(), this.size);

        while (iterator.hasNext()) {
            yield iterator.next();
        }
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

        this.game.fireEvent('insertCell', new InsertCellEvent(
            cell.getType()
        ));
    }

    public delete(x: number, y: number): void {
        this.game.fireEvent('deleteCell', new DeleteCellEvent(
            this.getCell(x, y).getType()
        ));

        delete this.cells[`${x}:${y}`];
    }

    public getCell(x: number, y: number): Cell {
        const cell = this.cells[`${x}:${y}`];

        if (cell) {
            return cell;
        }

        return this.cellFactory.createEmpty();
    }

    public countEmpty(): number {
        let result = this.size.getCellCount();

        for (const key in this.cells) {
            if (this.cells[key as `${number}:${number}`].isEmpty()) {
                result--;
            }
        }

        return result;
    }

    public getLoopMode(): LoopType {
        return this.loop;
    } 

    private createSnapshot(): Cell[][] {
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