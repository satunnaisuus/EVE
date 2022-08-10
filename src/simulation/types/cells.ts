import { Organ, CURRENT_VERSION as GENOME_VERSION } from '../cell/type/organism/genome';
import { Direction } from '../cell/type/organism/direction';
import { InstructionConfig, Command } from '../cell/type/organism/program';

export { Organ, Direction, Command, GENOME_VERSION };

export interface Genome {
    color: string;
    divideLimit: number;
    organs: Organ[];
    program: InstructionConfig[];
    version: 1;
}

export interface CellOrganism {
    type: 'organism';
    id: number;
    energy: number;
    direction: Direction;
    lifetime: number;
    programCounter: number;
    genome: Genome;
    supplyColor: string;
}

export interface CellWall {
    type: 'wall';
}

export interface CellOrganic {
    type: 'organic';
    energy: number;
}

export interface CellEmpty {
    type: 'empty';
}

export type CellType =
    | CellOrganism
    | CellWall
    | CellOrganic
    | CellEmpty;