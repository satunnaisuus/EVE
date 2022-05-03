import { Cell } from "./cell";
import CellVisitor from "./cell-visitor";

export class MeatCell extends Cell {
    visit(visitor: CellVisitor): void {
        visitor.visitMeat(this);
    }
}