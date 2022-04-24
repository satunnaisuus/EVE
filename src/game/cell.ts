import CellVisitor from "./cell-visitor";

export abstract class Cell {
    abstract visit(visitor: CellVisitor): void;
}