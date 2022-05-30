import { CellContext } from "./cell/cell-context";
import { CellFactory } from "./cell/cell-factory";
import { SimulationParams } from "./simulation-params";
import { Grid } from "./grid";
import { GridLoopType } from "./types/grid-loop-type";

export class State {
    private step: number = 0;

    private grid: Grid;

    constructor(
        width: number,
        height: number,
        loop: GridLoopType,
        private params: SimulationParams,
        private cellFactory: CellFactory
    ) {
        this.grid = new Grid(width, height, loop, cellFactory);
    }

    next(): void {
        const cells = this.grid.toArray();

        for (let x = 0; x < cells.length; x++) {
            for (let y = 0; y < cells[x].length; y++) {
                const cell = cells[x][y];

                if (cell.isStatic()) {
                    continue;
                }

                cell.update(
                    new CellContext(this.grid, x, y, this.cellFactory),
                    this.params
                );
            }
        }
        
        this.step++;
    }

    getGrid(): Grid {
        return this.grid;
    }

    getStep(): number {
        return this.step;
    }

    getParams(): SimulationParams {
        return this.params;
    }

    setParams(params: SimulationParams): void {
        this.params = params;
    }
}