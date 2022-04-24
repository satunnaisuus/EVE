import { Cell } from "./cell";
import cellVisitor from "./cell-visitor";

export class Organism extends Cell {
    visit(visitor: cellVisitor): void {
        visitor.visitOrganism(this);
    }
}