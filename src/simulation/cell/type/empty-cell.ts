import { AbstractCell } from "../abstract-cell";
import { CellVisitor } from "../cell-visitor";

export class EmptyCell extends AbstractCell {
    getType(): string {
        return 'empty';
    }

    visit(visitor: CellVisitor): void {
        visitor.visitEmpty(this);
    }

    isEmpty(): boolean {
        return true;
    }

    serialize() {
        return {
            type: 'empty',
        }
    }
}