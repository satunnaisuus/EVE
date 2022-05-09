import { Cell } from "./cell";
import cellVisitor from "./cell-visitor";

export class EmptyCell extends Cell {
    getType(): string {
        return 'empty';
    }

    visit(visitor: cellVisitor): void {
        visitor.visitEmpty(this);
    }


    isEmpty(): boolean {
        return true;
    }
}