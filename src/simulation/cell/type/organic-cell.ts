import { AbstractCell } from "../abstract-cell";

export class OrganicCell extends AbstractCell {
    getType(): string {
        return 'organic';
    }
    
    serialize() {
        return {
            type: 'organic',
        }
    }
}