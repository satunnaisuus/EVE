import { AbstractCell, CellType } from "../abstract-cell";

export class WallCell extends AbstractCell {
    getType(): CellType {
        return CellType.WALL;
    }
    
    serialize() {
        return {
            type: this.getType(),
        }
    }
}