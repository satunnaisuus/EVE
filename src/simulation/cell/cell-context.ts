import { AbstractCell } from "./abstract-cell";
import { CellFactory } from "./cell-factory";
import { Grid } from "../grid";
import { GridLoopType } from "../types/grid-loop-type";

class OutofBoundsError extends Error {

}

export class CellContext {
    constructor(
        private grid: Grid,
        private x: number,
        private y: number,
        private factory: CellFactory
    ) {

    }

    moveByOffest(x: number, y: number): void {
        try {
            const coordinates = this.getCoordinatesbyOffset(x, y);

            const cell = this.grid.getCell(this.x, this.y);
            const nextCell = this.grid.getCell(coordinates[0], coordinates[1]);

            if (nextCell.isEmpty()) {
                this.grid.delete(this.x, this.y);
                this.grid.insert(coordinates[0], coordinates[1], cell);
            }
        } catch (e) {
            
        }
    }

    deleteByOffset(x: number, y: number): void {
        const offset = this.getCoordinatesbyOffset(x, y);
        this.grid.delete(offset[0], offset[1]);
    }

    getByOffest(x: number, y: number): AbstractCell {
        try {
            const coordinates = this.getCoordinatesbyOffset(x, y);
            return this.grid.getCell(coordinates[0], coordinates[1]);
        } catch (error) {
            return this.factory.createWall();
        }
    }

    replace(createCell: (factory: CellFactory) => AbstractCell) {
        this.grid.delete(this.x, this.y);
        this.grid.insert(this.x, this.y, createCell(this.factory));
    }

    private getCoordinatesbyOffset(x: number, y: number): [number, number] {
        const loop = this.grid.getLoopMode();

        const loopX = loop === GridLoopType.TORUS || loop === GridLoopType.HORIZONTAL;
        const loopY = loop === GridLoopType.TORUS || loop === GridLoopType.VERTICAL;

        const width = this.grid.getWidth();
        const height = this.grid.getHeight();

        let resultX = this.x + x;
        let resultY = this.y + y;

        if (loopX) {
            while (resultX < 0) {
                resultX += width;
            }
        } else if (resultX < 0 || resultX > width - 1) {
            throw new OutofBoundsError();
        }

        if (loopY) {
            while (resultY < 0) {
                resultY += height;
            }
        } else if (resultY < 0 || resultY > height - 1) {
            throw new OutofBoundsError();
        }

        return [resultX % width, resultY % height];
    }
}