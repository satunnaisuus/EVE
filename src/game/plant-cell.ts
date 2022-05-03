import { Cell } from "./cell";
import CellVisitor from "./cell-visitor";

export class PlantCell extends Cell {
    visit(visitor: CellVisitor): void {
        visitor.visitPlant(this);
    }
}