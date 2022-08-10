import { AbstractCell, CellType } from "../abstract-cell";

export class EmptyCell extends AbstractCell {
    getType(): CellType {
        return CellType.EMPTY;
    }

    isEmpty(): boolean {
        return true;
    }

    serialize() {
        return {
            type: this.getType(),
        }
    }
}