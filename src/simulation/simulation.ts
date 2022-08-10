import { CreateOptions } from "./cell/cell-factory";
import { PayloadData } from "./data";
import { CellType } from "./types/cells";
import { SimulationOptions } from "./types/simulation-options";
import { SimulationParameters } from "./types/simulation-parameters";

export class StepData {
    constructor(
        public readonly step: number,
        public readonly buffer: ArrayBufferLike,
        public readonly payload: PayloadData,
    ) {
    }
}

export type Parameters = 'organismMaxLifetime' | 'photosynthesisEnergy' | 'chemosynthesisEnergy' | 'mutationChance';

export interface Dump {
    options: SimulationOptions;
    parameters: {
        photosynthesisEnergy: number,
        chemosynthesisEnergy: number,
        organismMaxLifetime: number,
    };
    step: number;
    grid: CellType[][];
    version: number;
}

export const DUMP_VERSION = 1;

export abstract class Simulation {
    constructor(protected options: SimulationOptions) {
        
    }

    abstract getState(payload: PayloadData): Promise<StepData>;

    abstract makeStep(): Promise<number>;

    abstract setParameter<T>(parameter: Parameters, value: T): Promise<T>;

    abstract getOrganismsCount(): Promise<number>;

    abstract findCellById(id: number): Promise<CellType>;

    abstract getCell(x: number, y: number): Promise<CellType>;

    abstract replace(coords: [number, number][], type: string, ignore: string[], options: CreateOptions): Promise<void>;

    abstract dump(): Promise<Dump>;

    abstract getParameters(): Promise<SimulationParameters>

    terminate(): void {

    }

    getOptions(): SimulationOptions {
        return this.options;
    }
}