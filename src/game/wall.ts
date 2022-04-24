import { Cell } from "./cell";
import cellVisitor from "./cell-visitor";

export class WallCell extends Cell {
    visit(visitor: cellVisitor): void {
        visitor.visitWall(this);
    }
}