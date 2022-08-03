import { Organ } from '../cell/type/organism/genome';
import { Direction } from '../cell/type/organism/direction';

export { Organ };

export { Direction };

export interface CellOrganism {
    type: 'organism';
    id: number;
    energy: number;
    direction: Direction;
    lifetime: number;
    genome: {
        color: string;
        divideLimit: number;
        organs: Organ[];
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