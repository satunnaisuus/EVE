import { Cell } from "../../types/cells";
import { AbstractCell, CellType } from "../abstract-cell";

export class OrganicCell extends AbstractCell {
    constructor(private energy: number) {
        super();
    }

    update(): void {
        return;
    }

    getEnergy(): number {
        return this.energy;
    }

    getType(): CellType {
        return CellType.ORGANIC;
    }
    
    serialize(): Cell {
        return {
            type: CellType.ORGANIC,
            energy: this.energy,
        };
    }
}