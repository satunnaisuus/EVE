import { AbstractCell } from "../abstract-cell";
import { CellVisitor } from "../cell-visitor";

export class PlantCell extends AbstractCell {
    getType(): string {
        return 'plant';
    }

    visit(visitor: CellVisitor): void {
        visitor.visitPlant(this);
    }
}