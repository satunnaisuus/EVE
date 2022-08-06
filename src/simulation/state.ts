import { CellContext } from "./cell/cell-context";
import { CellFactory, CreateOptions } from "./cell/cell-factory";
import { SimulationParameters } from "./simulation-parameters";
import { Grid } from "./grid";
import { GridLoopType } from "./types/grid-loop-type";

export class State {
    private step: number = 0;

    private grid: Grid;

    constructor(
        width: number,
        height: number,
        loop: GridLoopType,
        private parameters: SimulationParameters,
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
                    new CellContext(this.grid, x, y, this.cellFactory, this.parameters),
                    this.parameters
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

    getParameters(): SimulationParameters {
        return this.parameters;
    }

    getOrganismsCount(): number {
        let result = 0;

        for (let x = 0; x < this.grid.getWidth(); x++) {
            for (let y = 0; y < this.grid.getHeight(); y++) {
                const cell = this.grid.getCell(x, y);

                if (cell.getType() === 'organism') {
                    result++;
                }
            }
        }

        return result;
    }

    replace(coords: [number, number][], type: string, ignore: string[], options: CreateOptions): void {
        for (const [x, y] of coords) {
            const cell = this.getGrid().getCell(x, y);

            if (! ignore.includes(cell.getType())) {
                this.getGrid().insert(x, y, this.cellFactory.create(type, options));
            }
        }
    }
}