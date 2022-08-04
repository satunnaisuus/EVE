import { Organ } from '../cell/type/organism/genome';
import { Direction } from '../cell/type/organism/direction';
import { InstructionConfig, Command } from '../cell/type/organism/program';

export { Organ, Direction, Command };

export interface CellOrganism {
    type: 'organism';
    id: number;
    energy: number;
    direction: Direction;
    lifetime: number;
    programCounter: number;
    genome: {
        color: string;
        divideLimit: number;
        organs: Organ[];
        program: InstructionConfig[];
    }
}

export interface CellWall {
    type: 'wall';
}

export interface CellOrganic {
    type: 'organic';
}

export interface CellEmpty {
    type: 'empty';
}

export type CellType =
    | CellOrganism
    | CellWall
    | CellOrganic
    | CellEmpty;