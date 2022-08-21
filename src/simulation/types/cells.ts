import { Organ, GENOME_VERSION } from '../cell/type/organism-cell';
import { Direction } from '../cell/type/organism/direction';
import { Command } from '../cell/type/organism/interpreter';
import { CellType } from '../cell/abstract-cell';

export { CellType, Organ, Direction, Command, GENOME_VERSION };

export interface GenomeSerialized {
    color: string;
    organs: Organ[];
    program: number[];
    version: number;
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