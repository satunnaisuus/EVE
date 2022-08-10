import { OrganismCell } from "./cell/type/organism-cell";
import { Grid } from "./grid";
import { CellType } from "./types/cells";

export type PayloadData = 'energy' | 'lifetime' | 'genesis' | 'supply';

const PAYLOAD_SIZE_MAP = {
    energy: 1,
    lifetime: 1,
    genesis: 3,
    supply: 3,
}

export class Data {
    private readonly organismDataLength;

    constructor(
        private array: Uint8Array,
        private payload: PayloadData,
        private width: number,
        private height: number
    ) {
        this.organismDataLength = ! this.payload ? 1 : (PAYLOAD_SIZE_MAP[this.payload] + 1);
    }

    static create(grid: Grid, payload: PayloadData): Data {
        const width = grid.getWidth();
        const height = grid.getHeight();
        const array = [];

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const cell = grid.getCell(x, y);

                array.push(cell.getType());

                if (cell instanceof OrganismCell) {
                    switch (payload) {
                        case 'energy':
                            array.push(cell.getEnergy());
                            break;

                        case 'lifetime':
                            array.push(cell.getLifetime());
                            break;

                        case 'genesis':
                            const color = cell.getColor().toArray();
                            array.push(color[0]);
                            array.push(color[1]);
                            array.push(color[2]);
                            break;

                        case 'supply':
                            const supplyColor = cell.getSupplyColor().toArray();
                            array.push(supplyColor[0]);
                            array.push(supplyColor[1]);
                            array.push(supplyColor[2]);
                            break;
                    }
                }
            }
        }

        return new Data(new Uint8Array(array), payload, width, height);
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

    getItemLength(type: CellType): number {
        switch (type) {
            case CellType.EMPTY:
                return 1;
            case CellType.ORGANISM:
                return this.organismDataLength;
            case CellType.ORGANIC:
                return 1;
            case CellType.WALL:
                return 1;
        }

        throw new Error();
    }
}