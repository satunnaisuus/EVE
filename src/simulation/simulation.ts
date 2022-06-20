import { SimulationOptions } from "./types/simulation-options";

export class StepData {
    constructor(
        public readonly step: number,
        public readonly buffer: ArrayBufferLike,
        public readonly payload: CellPayload,
    ) {
    }
}

export type CellPayload = 'energy' | 'lifetime' | 'direction' | 'genesis';

export type Parameters = 'organismMaxLifetime' | 'organicEnergy' | 'photosynthesisEnergy';

export abstract class Simulation {
    constructor(protected options: SimulationOptions) {
        
    }

    abstract getState(payload: CellPayload): Promise<StepData>;

    abstract step(): Promise<number>;

    abstract setParameter<T>(parameter: Parameters, value: T): Promise<T>;

    abstract getOrganismsCount(): Promise<number>;

    terminate(): void {

    }

    getOptions(): SimulationOptions {
        return this.options;
    }
}