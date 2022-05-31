import { SimulationOptions } from "./types/simulation-options";

export class StepData {
    constructor(
        public readonly step: number,
        public readonly buffer: ArrayBufferLike,
        public readonly payload: CellPayload[],
    ) {
    }
}

export type CellPayload = 'energy' | 'lifetime' | 'direction';

export abstract class Simulation {
    constructor(protected options: SimulationOptions) {
        
    }

    abstract getState(payload: CellPayload[]): Promise<StepData>;

    abstract step(): Promise<number>;

    terminate(): void {

    }

    getOptions(): SimulationOptions {
        return this.options;
    }
}