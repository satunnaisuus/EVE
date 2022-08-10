import { Cell } from "../../types/cells";
import { AbstractCell, CellType } from "../abstract-cell";

export class WallCell extends AbstractCell {
    update(): void {
        return;
    }
    
    getType(): CellType {
        return CellType.WALL;
    }
    
    serialize(): Cell {
        return {
            type: CellType.WALL,
        }
    }
}