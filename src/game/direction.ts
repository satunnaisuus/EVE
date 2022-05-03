export enum Direction {
    NORTH = 0,
    NORTH_EAST = 1,
    NORTH_WEST = 2,
    SOUTH = 3,
    SOUTH_EAST = 4,
    SOUTH_WEST = 5,
    EAST = 6,
    WEST = 7,
}

export namespace Direction {
    export function getOffset(direction: Direction): [number, number] {
        switch (direction) {
            case Direction.NORTH: return [1, 0];
            case Direction.NORTH_EAST: return [1, 1];
            case Direction.NORTH_WEST: return [-1, 1];
            case Direction.SOUTH: return [0, -1];
            case Direction.SOUTH_EAST: return [1, -1];
            case Direction.SOUTH_WEST: return [-1, -1];
            case Direction.EAST: return [1, 0];
            case Direction.WEST: return [-1, 0];
        }
    }

    export function random(): Direction {
        const enumValues = Object.keys(Direction)
            .map(n => Number.parseInt(n))
            .filter(n => !Number.isNaN(n)) as unknown as Direction[];

        return enumValues[Math.floor(Math.random() * enumValues.length)];
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
}