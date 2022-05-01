import { Cell } from "./cell";
import cellVisitor from "./cell-visitor";

export class OrganismCell extends Cell {
    visit(visitor: cellVisitor): void {
        visitor.visitOrganism(this);
    }
}