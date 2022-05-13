import { randomInt } from "../../../../common/random";

export enum Direction {
    NORTH = 'NORTH',
    NORTH_EAST = 'NORTH_EAST',
    NORTH_WEST = 'NORTH_WEST',
    SOUTH = 'SOUTH',
    SOUTH_EAST = 'SOUTH_EAST',
    SOUTH_WEST = 'SOUTH_WEST',
    EAST = 'EAST',
    WEST = 'WEST'
}

export function getOffset(direction: Direction): [number, number] {
    switch (direction) {
        case Direction.NORTH: return [0, -1];
        case Direction.NORTH_EAST: return [1, -1];
        case Direction.NORTH_WEST: return [-1, -1];
        case Direction.SOUTH: return [0, 1];
        case Direction.SOUTH_EAST: return [1, 1];
        case Direction.SOUTH_WEST: return [-1, 1];
        case Direction.EAST: return [1, 0];
        case Direction.WEST: return [-1, 0];
    }
}

export function randomDirection(): Direction {
    return Direction[Object.keys(Direction)[randomInt(0, 7)] as keyof typeof Direction];
}

export function rotateLeft(direction: Direction): Direction {
    switch (direction) {
        case Direction.NORTH: return Direction.NORTH_WEST;
        case Direction.NORTH_EAST: return Direction.NORTH;
        case Direction.NORTH_WEST: return Direction.WEST;
        case Direction.SOUTH: return Direction.SOUTH_EAST;
        case Direction.SOUTH_EAST: return Direction.EAST;
        case Direction.SOUTH_WEST: return Direction.SOUTH;
        case Direction.EAST: return Direction.NORTH_EAST;
        case Direction.WEST: return Direction.SOUTH_WEST;
    }
}

export function rotateRight(direction: Direction): Direction {
    switch (direction) {
        case Direction.NORTH: return Direction.NORTH_EAST;
        case Direction.NORTH_EAST: return Direction.EAST;
        case Direction.NORTH_WEST: return Direction.NORTH;
        case Direction.SOUTH: return Direction.SOUTH_WEST;
        case Direction.SOUTH_EAST: return Direction.SOUTH;
        case Direction.SOUTH_WEST: return Direction.WEST;
        case Direction.EAST: return Direction.SOUTH_EAST;
        case Direction.WEST: return Direction.NORTH_WEST;
    }
}