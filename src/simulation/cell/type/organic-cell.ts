import { AbstractCell, CellType } from "../abstract-cell";

export class OrganicCell extends AbstractCell {
    constructor(private energy: number) {
        super();
    }

    getEnergy(): number {
        return this.energy;
    }

    getType(): CellType {
        return CellType.ORGANIC;
    }
    
    serialize() {
        return {
            type: this.getType(),
            energy: this.energy,
        }
    }
}