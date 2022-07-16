import { OrganismCell } from "./cell/type/organism-cell";
import { State } from "./state";

export type PayloadData = 'direction' | 'energy' | 'lifetime' | 'genesis' | 'supply';

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
                            const energyFromOrganic = cell.getEnergyFromOrganic();
                            const energyFromPhotosynthesis = cell.getEnergyFromPhotosynthesis();
                            const energyFromChemosynthesis = cell.getEnergyFromChemosynthesis();

                            const max = Math.max(energyFromOrganic, energyFromPhotosynthesis, energyFromChemosynthesis);

                            if (max === 0) {
                                array[i] = 255;
                                array[i + 1] = 255;
                                array[i + 2] = 255;
                            } else {
                                array[i] = Math.trunc(255 * energyFromOrganic / max);
                                array[i + 1] = Math.trunc(255 * energyFromPhotosynthesis / max);
                                array[i + 2] = Math.trunc(255 * energyFromChemosynthesis / max);
                            }
                            
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