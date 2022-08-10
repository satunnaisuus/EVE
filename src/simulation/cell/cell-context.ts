import { AbstractCell } from "./abstract-cell";
import { CellFactory } from "./cell-factory";
import { Grid } from "../grid";
import { SimulationParameters } from "../simulation-parameters";

export class CellContext {
    constructor(
        private grid: Grid,
        private x: number,
        private y: number,
        private factory: CellFactory,
        private parameters: SimulationParameters
    ) {

    }

    moveByOffest(x: number, y: number): boolean {
        const cell = this.grid.getCell(this.x, this.y);
        const nextCell = this.grid.getCell(this.x + x, this.y + y);

        if (nextCell.isEmpty()) {
            this.grid.delete(this.x, this.y);
            this.grid.insert(this.x + x, this.y + y, cell);

            return true;
        }

        return false;
    }

    deleteByOffset(x: number, y: number): void {
        this.grid.delete(this.x + x, this.y + y);
    }

    getByOffest(x: number, y: number): AbstractCell {
        return this.grid.getCell(this.x + x, this.y + y);
    }

    replace(createCell: (factory: CellFactory) => AbstractCell) {
        this.grid.delete(this.x, this.y);
        this.grid.insert(this.x, this.y, createCell(this.factory));
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
}