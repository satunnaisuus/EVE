import { Cell } from "./cell";
import CellFactory from "./cell-factory";
import Grid from "./grid";

class OutofBoundsError extends Error {

}

export default class CellContext {
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
            const nextCell = this.grid.getCell(...coordinates);

            if (nextCell.isEmpty()) {
                this.grid.delete(this.x, this.y);
                this.grid.insert(coordinates[0], coordinates[1], cell);
            }
        } catch (e) {
            
        }
    }

    deleteByOffset(x: number, y: number): void {
        this.grid.delete(...this.getCoordinatesbyOffset(x, y));
    }

    getByOffest(x: number, y: number): Cell {
        try {
            return this.grid.getCell(...this.getCoordinatesbyOffset(x, y));
        } catch (error) {
            return this.factory.createWall();
        }
    }

    replace(createCell: (factory: CellFactory) => Cell) {
        this.grid.delete(this.x, this.y);
        this.grid.insert(this.x, this.y, createCell(this.factory));
    }

    private getCoordinatesbyOffset(x: number, y: number): [number, number] {
        const loop = this.grid.getLoopMode();

        const loopX = loop === 'full' || loop === 'horizontal';
        const loopY = loop === 'full' || loop === 'vertical';

        const size = this.grid.getSize();

        let resultX = this.x + x;
        let resultY = this.y + y;

        if (loopX) {
            while (resultX < 0) {
                resultX += size.getWidth();
            }
        } else if (resultX < 0 || resultX > size.getWidth() - 1) {
            throw new OutofBoundsError();
        }

        if (loopY) {
            while (resultY < 0) {
                resultY += size.getHeight();
            }
        } else if (resultY < 0 || resultY > size.getHeight() - 1) {
            throw new OutofBoundsError();
        }

        return [resultX % size.getWidth(), resultY % size.getHeight()];
    }
}