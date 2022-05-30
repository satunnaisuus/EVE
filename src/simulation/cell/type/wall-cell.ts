import { AbstractCell } from "../abstract-cell";
import { CellVisitor } from "../cell-visitor";

export class WallCell extends AbstractCell {
    getType(): string {
        return 'wall';
    }

    visit(visitor: CellVisitor): void {
        visitor.visitWall(this);
    }
    
    serialize() {
        return {
            type: 'wall',
        }
    }
}