import { CellType } from "./types/cells";
import { SimulationOptions } from "./types/simulation-options";

export class StepData {
    constructor(
        public readonly step: number,
        public readonly buffer: ArrayBufferLike,
        public readonly payload: CellPayload,
    ) {
    }
}

export type CellPayload = 'energy' | 'lifetime' | 'direction' | 'genesis' | 'supply';

export type Parameters = 'organismMaxLifetime' | 'photosynthesisEnergy' | 'chemosynthesisEnergy';

export abstract class Simulation {
    constructor(protected options: SimulationOptions) {
        
    }

    abstract getState(payload: CellPayload): Promise<StepData>;

    abstract step(): Promise<number>;

    abstract setParameter<T>(parameter: Parameters, value: T): Promise<T>;

    abstract getOrganismsCount(): Promise<number>;

    abstract findCellById(id: number): Promise<CellType>;

    abstract getCell(x: number, y: number): Promise<CellType>;

    abstract replace(coords: [number, number][], type: string): Promise<void>;

    terminate(): void {

    }

    getOptions(): SimulationOptions {
        return this.options;
    }
}