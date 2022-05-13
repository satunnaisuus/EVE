import { AbstractCell } from "../abstract-cell";
import { CellVisitor } from "../cell-visitor";

export class MeatCell extends AbstractCell {
    getType(): string {
        return 'meat';
    }

    visit(visitor: CellVisitor): void {
        visitor.visitMeat(this);
    }
}