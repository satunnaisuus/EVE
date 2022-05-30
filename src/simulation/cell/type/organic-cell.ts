import { AbstractCell } from "../abstract-cell";
import { CellVisitor } from "../cell-visitor";

export class OrganicCell extends AbstractCell {
    getType(): string {
        return 'organic';
    }

    visit(visitor: CellVisitor): void {
        visitor.visitOrganic(this);
    }
    
    serialize() {
        return {
            type: 'organic',
        }
    }
}