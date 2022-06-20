import { AbstractCell } from "../abstract-cell";

export class EmptyCell extends AbstractCell {
    getType(): string {
        return 'empty';
    }

    isEmpty(): boolean {
        return true;
    }

    serialize() {
        return {
            type: 'empty',
        }
    }
}