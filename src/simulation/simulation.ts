import { CreateOptions } from "./cell/cell-factory";
import { PayloadData } from "./data";
import { Cell, CellType } from "./types/cells";
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

export enum Parameter {
    photosynthesisEnergy = 'photosynthesisEnergy',
    chemosynthesisEnergy = 'chemosynthesisEnergy',
    organismMaxLifetime = 'organismMaxLifetime',
    mutationProgramRate = 'mutationProgramRate',
    mutationBaseOrgansRate = 'mutationBaseOrgansRate',
    mutationLimbOrgansRate = 'mutationLimbOrgansRate',
    eatCost = 'eatCost',
    attackCostRate = 'attackCostRate',
    divideCost = 'divideCost',
    spineDamageRate = 'spineDamageRate',
    armourProtectionRate = 'armourProtectionRate',
    stepCost = 'stepCost',
}

export interface Dump {
    options: SimulationOptions;
    parameters: {
        [key in Parameter]: number;
    };
    step: number;
    grid: Cell[][];
    version: number;
}

export const DUMP_VERSION = 1;

export abstract class Simulation {
    constructor(protected options: SimulationOptions) {
        
    }

    abstract getState(payload: PayloadData): Promise<StepData>;

    abstract makeStep(): Promise<number>;

    abstract setParameter<T>(parameter: Parameter, value: T): Promise<T>;

    abstract getOrganismsCount(): Promise<number>;

    abstract findCellById(id: number): Promise<Cell>;

    abstract getCell(x: number, y: number): Promise<Cell>;

    abstract replace(coords: [number, number][], type: CellType, ignore: CellType[], options: CreateOptions): Promise<void>;

    abstract dump(): Promise<Dump>;

    abstract getParameters(): Promise<SimulationParameters>

    terminate(): void {
        return;
    }

    getOptions(): SimulationOptions {
        return this.options;
    }
}