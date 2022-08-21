import { randomInt } from "../../../../common/random";

export enum Direction {
    NORTH = 0,
    NORTH_EAST = 1,
    EAST = 2,
    SOUTH_EAST = 3,
    SOUTH = 4,
    SOUTH_WEST = 5,
    WEST = 6,
    NORTH_WEST = 7
}

export const directionsList = [
    Direction.NORTH,
    Direction.NORTH_EAST,
    Direction.EAST,
    Direction.SOUTH_EAST,
    Direction.SOUTH,
    Direction.SOUTH_WEST,
    Direction.WEST,
    Direction.NORTH_WEST
];

export function randomDirection(): Direction {
    return randomInt(0, 7);
}

export function rotateLeft(direction: Direction): Direction {
    if (direction === Direction.NORTH) {
        return Direction.NORTH_WEST;
    }

    return direction - 1;
}

export function rotateRight(direction: Direction): Direction {
    if (direction === Direction.NORTH_WEST) {
        return Direction.NORTH;
    }

    return direction + 1;
}

export function rotateOnOffset(direction: Direction, offset: number): Direction {
    let index = direction + offset;

    if (index < 0) {
        index -= 8 * Math.floor(index / 8)
    }

    return index % 8;
}

export function reverseDirection(direction: Direction): Direction {
    return rotateOnOffset(direction, 4);
}