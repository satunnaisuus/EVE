import { Cell } from "../../types/cells";
import { AbstractCell, CellType } from "../abstract-cell";

export class EmptyCell extends AbstractCell {
    update(): void {
        return;
    }
    
    getType(): CellType {
        return CellType.EMPTY;
    }

    isEmpty(): boolean {
        return true;
    }

    serialize(): Cell {
        return {
            type: CellType.EMPTY,
        }
    }
}