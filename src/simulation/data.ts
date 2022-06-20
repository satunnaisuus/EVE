import { OrganismCell } from "./cell/type/organism-cell";
import { State } from "./state";

export type PayloadData = 'direction' | 'energy' | 'lifetime';

const CELL_TYPE_MAP: {[key: string]: number} = {
    empty: 0,
    organism: 1,
    organic: 2,
    wall: 3,
}

const DIRECTION_MAP: any = {
    NORTH: 0,
    NORTH_EAST: 1,
    NORTH_WEST: 2,
    SOUTH: 3,
    SOUTH_EAST: 4,
    SOUTH_WEST: 5,
    EAST: 6,
    WEST: 7
};

export class Data {
    constructor(
        private array: Uint8Array,
        private payload: PayloadData,
        private width: number,
        private height: number
    ) {

    }

    static create(state: State, payload: PayloadData): Data {
        const grid = state.getGrid();
        const width = grid.getWidth();
        const height = grid.getHeight();
        const array = new Uint8Array(width * height * 2);

        let i = 0;
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const cell = grid.getCell(x, y);

                array[i++] = CELL_TYPE_MAP[cell.getType()];

                if (cell instanceof OrganismCell) {
                    switch (payload) {
                        case 'direction':
                            array[i] = DIRECTION_MAP[cell.getDirection()];
                            break;
                        case 'energy':
                            array[i] = cell.getEnergy();
                            break;
                        case 'lifetime':
                            array[i] = cell.getLifetime();
                            break;
                        default:
                            throw new Error();
                    }
                }

                i++;
            }
        }

        return new Data(array, payload, width, height);
    }

    getArray(): Uint8Array {
        return this.array;
    }

    getPayload(): PayloadData {
        return this.payload;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }
}