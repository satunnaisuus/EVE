import { Cell } from "./cell";
import cellVisitor from "./cell-visitor";

export class WallCell extends Cell {
    getType(): string {
        return 'wall';
    }

    visit(visitor: cellVisitor): void {
        visitor.visitWall(this);
    }
}