import { Cell } from "./cell";
import CellVisitor from "./cell-visitor";

export class MeatCell extends Cell {
    getType(): string {
        return 'meat';
    }

    visit(visitor: CellVisitor): void {
        visitor.visitMeat(this);
    }
}