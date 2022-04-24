import { Cell } from "./cell";
import cellVisitor from "./cell-visitor";

export class EmptyCell extends Cell {
    visit(visitor: cellVisitor): void {
        visitor.visitEmpty(this);
    }
}