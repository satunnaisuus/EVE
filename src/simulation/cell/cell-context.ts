import { AbstractCell } from "./abstract-cell";
import { CellFactory } from "./cell-factory";
import { Grid } from "../grid";
import { SimulationParameters } from "../simulation-parameters";
import { Direction } from "./type/organism/direction";
import { OrganPool } from "./type/organism/organ-pool";
import { Interpreter } from "./type/organism/interpreter";

const offsetXByDirection = {
    [Direction.NORTH]: 0,
    [Direction.NORTH_EAST]: 1,
    [Direction.NORTH_WEST]: -1,
    [Direction.SOUTH]: 0,
    [Direction.SOUTH_EAST]: 1,
    [Direction.SOUTH_WEST]: -1,
    [Direction.EAST]: 1,
    [Direction.WEST]: -1,
};

const offsetYByDirection = {
    [Direction.NORTH]: -1,
    [Direction.NORTH_EAST]: -1,
    [Direction.NORTH_WEST]: -1,
    [Direction.SOUTH]: 1,
    [Direction.SOUTH_EAST]: 1,
    [Direction.SOUTH_WEST]: 1,
    [Direction.EAST]: 0,
    [Direction.WEST]: 0,
};

export class CellContext {
    constructor(
        private grid: Grid,
        private x: number,
        private y: number,
        private factory: CellFactory,
        private interpreter: Interpreter,
        private organPool: OrganPool,
        private parameters: SimulationParameters,
    ) {

    }

    moveByDirection(direction: Direction): boolean {
        const x = offsetXByDirection[direction];
        const y = offsetYByDirection[direction];
        const cell = this.grid.getCell(this.x, this.y);
        const nextCell = this.grid.getCell(this.x + x, this.y + y);

        if (nextCell.isEmpty()) {
            this.grid.delete(this.x, this.y);
            this.grid.insert(this.x + x, this.y + y, cell);

            return true;
        }

        return false;
    }

    deleteByDirection(direction: Direction): void {
        this.grid.delete(
            this.x + offsetXByDirection[direction],
            this.y + offsetYByDirection[direction]
        );
    }

    replaceByDirection(direction: Direction, cell: AbstractCell): void {
        this.grid.insert(
            this.x + offsetXByDirection[direction],
            this.y + offsetYByDirection[direction],
            cell
        );
    }

    getByDirection(direction: Direction): AbstractCell {
        return this.grid.getCell(
            this.x + offsetXByDirection[direction],
            this.y + offsetYByDirection[direction]
        );
    }

    replace(cell: AbstractCell) {
        this.grid.delete(this.x, this.y);
        this.grid.insert(this.x, this.y, cell);
    }

    getLightEnergy(): number {
        return Math.round(this.parameters.photosynthesisEnergy * this.grid.getLightLevel(this.x, this.y) / 100);
    }

    getMineralsEnergy(): number {
        return Math.round(this.parameters.chemosynthesisEnergy * this.grid.getMineralsLevel(this.x, this.y) / 100);
    }

    getSimulationParameters(): SimulationParameters {
        return this.parameters;
    }

    setX(x: number): void {
        this.x = x;
    }

    setY(y: number): void {
        this.y = y;
    }

    getCellFactory(): CellFactory {
        return this.factory;
    }

    getInterpreter(): Interpreter {
        return this.interpreter;
    }

    getOrganPool(): OrganPool {
        return this.organPool;
    }
}