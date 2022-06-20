import { AbstractCell } from "../abstract-cell";

export class WallCell extends AbstractCell {
    getType(): string {
        return 'wall';
    }
    
    serialize() {
        return {
            type: 'wall',
        }
    }
}