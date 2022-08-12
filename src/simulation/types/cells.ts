import { Organ, CURRENT_VERSION as GENOME_VERSION } from '../cell/type/organism/genome';
import { Direction } from '../cell/type/organism/direction';
import { InstructionConfig, Command } from '../cell/type/organism/program';
import { CellType } from '../cell/abstract-cell';

export { CellType, Organ, Direction, Command, GENOME_VERSION };

export interface GenomeSerialized {
    color: string;
    organs: Organ[];
    program: InstructionConfig[];
    version: 1;
}

export interface CellOrganism {
    type: CellType.ORGANISM;
    id: number;
    energy: number;
    direction: Direction;
    lifetime: number;
    programCounter: number;
    genome: GenomeSerialized;
    supplyColor: string;
}

export interface CellWall {
    type: CellType.WALL;
}

export interface CellOrganic {
    type: CellType.ORGANIC;
    energy: number;
}

export interface CellEmpty {
    type: CellType.EMPTY;
}

export type Cell =
    | CellOrganism
    | CellWall
    | CellOrganic
    | CellEmpty;