import { assertGreaterThan } from "../common/asserts";

export class GridSize {
    private readonly ratio: number;

    private readonly cellCount: number;

    constructor(
        private readonly width: number,
        private readonly height: number
    ) {
        assertGreaterThan(width, 0);
        assertGreaterThan(height, 0);

        this.ratio = width / height;
        this.cellCount = this.width * this.height;
    }

    getWidth(): number {
        return this.width;
    }

    setWidth(width: number): GridSize {
        return new GridSize(width, this.height);
    }

    getHeight(): number {
        return this.height;
    }

    setHeight(height: number): GridSize {
        return new GridSize(this.width, height);
    }

    getRatio(): number {
        return this.ratio;
    }

    getCellCount(): number {
        return this.cellCount;
    }
}