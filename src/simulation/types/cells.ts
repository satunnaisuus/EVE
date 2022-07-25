export interface CellOrganism {
    id: number;
    type: 'organism';
    energy: number;
    direction: Direction;
    lifetime: number;
    genome: {
        color: string;
        divideLimit: number;
        program: number[];
    }
}

export type Direction = 'NORTH_WEST'
    | 'NORTH'
    | 'NORTH_EAST'
    | 'SOUTH'
    | 'SOUTH_EAST'
    | 'SOUTH_WEST'
    | 'EAST'
    | 'WEST';

export type OrganismAction = 'ROTATE_LEFT'
    | 'ROTATE_RIGHT'
    | 'STEP'
    | 'ATTACK'
    | 'EAT'
    | 'DIVIDE'
    | 'NOTHING'
    | 'PHOTOSYNTHESIS';

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