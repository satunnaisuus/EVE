export interface CellOrganism {
    type: 'organism';
    energy: number;
    direction: string;
    color: string;
    lifetime: number;
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