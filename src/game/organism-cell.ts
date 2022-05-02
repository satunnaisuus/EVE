import { Cell } from "./cell";
import CellContext from "./cell-context";
import CellFactory from "./cell-factory";
import cellVisitor from "./cell-visitor";
import { Direction } from "./direction";

const MAX_LIFETIME = 100;
const INITIAL_ENERGY = 100;

export class OrganismCell extends Cell {
    private lifetime: number = 0;

    private energy: number = INITIAL_ENERGY;

    private direction: Direction;

    constructor() {
        super();
        this.direction = Direction.random();
    }

    getLifetime(): number {
        return this.lifetime;
    }

    getEnergy(): Direction {
        return this.energy;
    }

    getDirection(): Direction {
        return this.direction;
    }

    visit(visitor: cellVisitor): void {
        visitor.visitOrganism(this);
    }

    update(context: CellContext): void {
        if (this.lifetime > MAX_LIFETIME || this.energy <= 0) {
            context.replace((factory: CellFactory) => factory.createEmpty());
            return;
        }

        this.direction = Direction.random();

        context.moveByOffest(...this.getOffsetByDirection());

        this.lifetime++;
        this.energy--;
    }

    isStatic(): boolean {
        return false;
    }

    private getOffsetByDirection(): [number, number] {
        switch (this.direction) {
            case Direction.NORTH_WEST:
                return [-1, -1];
            case Direction.NORTH:
                return [0, -1];
            case Direction.NORTH_EAST:
                return [1, -1];
            case Direction.SOUTH_WEST:
                return [-1, 1];
            case Direction.SOUTH:
                return [0, 1];
            case Direction.SOUTH_EAST:
                return [1, 1];
            case Direction.WEST:
                return [-1, 0];
            case Direction.EAST:
                return [1, 0];
        }
    }
}