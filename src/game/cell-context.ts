import Grid from "./grid";

export default class CellContext {
    constructor(
        private grid: Grid,
        private x: number,
        private y: number
    ) {

    }

    moveByOffest(x: number, y: number) {
        const coordinates = this.getCoordinatesbyOffset(x, y);

        const cell = this.grid.getCell(this.x, this.y);
        const nextCell = this.grid.getCell(...coordinates);

        if (nextCell.isEmpty()) {
            this.grid.delete(this.x, this.y);
            this.grid.insert(coordinates[0], coordinates[1], cell);
        }
    }

    private getCoordinatesbyOffset(x: number, y: number): [number, number] {
        const size = this.grid.getSize();

        let resultX = this.x + x;
        let resultY = this.y + y;

        while (resultX < 0) {
            resultX += size.getWidth();
        }

        while (resultY < 0) {
            resultY += size.getHeight();
        }

        return [resultX % size.getWidth(), resultY % size.getHeight()];
    }
}