import { OrganismCell } from "./cell/type/organism-cell";
import { OrganismAction } from "./cell/type/organism/action";
import { State } from "./state";

export type PayloadData = 'direction' | 'energy' | 'lifetime' | 'genesis' | 'supply' | 'attack' | 'step' | 'children' | 'action';

const CELL_TYPE_MAP: {[key: string]: number} = {
    empty: 0,
    organism: 1,
    organic: 2,
    wall: 3,
}

const PAYLOAD_SIZE_MAP = {
    direction: 1,
    energy: 1,
    lifetime: 1,
    genesis: 3,
    supply: 3,
    attack: 1,
    step: 1,
    children: 1,
    action: 1,
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

const ACTION_MAP: any = {
    [OrganismAction.ROTATE_LEFT]: 1,
    [OrganismAction.ROTATE_RIGHT]: 2,
    [OrganismAction.STEP]: 3,
    [OrganismAction.ATTACK]: 4,
    [OrganismAction.EAT]: 5,
    [OrganismAction.DIVIDE]: 6,
    [OrganismAction.NOTHING]: 7,
    [OrganismAction.PHOTOSYNTHESIS]: 8,
    [OrganismAction.CHEMOSYNTHESIS]: 9,
};

export class Data {
    private readonly itemLength;

    constructor(
        private array: Uint8Array,
        private payload: PayloadData,
        private width: number,
        private height: number
    ) {
        this.itemLength = ! this.payload ? 1 : (PAYLOAD_SIZE_MAP[this.payload] + 1);
    }

    static create(state: State, payload: PayloadData): Data {
        const grid = state.getGrid();
        const width = grid.getWidth();
        const height = grid.getHeight();
        const payloadSize = ! payload ? 0 : PAYLOAD_SIZE_MAP[payload];
        const array = new Uint8Array(width * height * (payloadSize + 1));

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

                        case 'genesis':
                            const color = cell.getColor().toArray();
                            array[i] = color[0];
                            array[i + 1] = color[1];
                            array[i + 2] = color[2];
                            break;

                        case 'supply':
                            const supplyColor = cell.getGenome().getSupplyColor().toArray();
                            array[i] = supplyColor[0];
                            array[i + 1] = supplyColor[1];
                            array[i + 2] = supplyColor[2];
                            break;

                        case 'attack':
                            array[i] = cell.getAttackCount();
                            break;

                        case 'step':
                            array[i] = cell.getStepCount();
                            break;

                        case 'children':
                            array[i] = cell.getChildrenCount();
                            break;

                        case 'action':
                            const action = cell.getLastAction();
                            array[i] = action === null ? 0 : ACTION_MAP[action];
                            break;
                    }
                }

                i += payloadSize;
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

    getItemLength(): number {
        return this.itemLength;
    }
}