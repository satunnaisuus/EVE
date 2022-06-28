export interface CellOrganism {
    id: number;
    type: 'organism';
    energy: number;
    direction: Direction;
    color: string;
    lifetime: number;
}

export type Direction = 'NORTH_WEST'
    | 'NORTH'
    | 'NORTH_EAST'
    | 'SOUTH'
    | 'SOUTH_EAST'
    | 'SOUTH_WEST'
    | 'EAST'
    | 'WEST';

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