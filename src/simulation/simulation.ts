import { GridLoopType } from "./types/grid-loop-type";
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
    protected options: SimulationOptions;

    constructor(options: SimulationOptions) {
        this.options = Object.assign({
            width: 200,
            height: 100,
            loop: GridLoopType.NONE,
            population: 5,
            initialEnergy: 70,
        }, options);
    }

    abstract getState(payload: CellPayload[]): Promise<StepData>;

    abstract step(): Promise<number>;

    terminate(): void {

    }

    getOptions(): SimulationOptions {
        return this.options;
    }
}