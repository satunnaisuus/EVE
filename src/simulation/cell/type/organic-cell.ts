import { AbstractCell } from "../abstract-cell";

export class OrganicCell extends AbstractCell {
    constructor(private energy: number) {
        super();
    }

    getEnergy(): number {
        return this.energy;
    }

    getType(): string {
        return 'organic';
    }
    
    serialize() {
        return {
            type: 'organic',
            energy: this.energy,
        }
    }
}