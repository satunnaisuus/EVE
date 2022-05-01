import { assertGreaterOrEqualThan } from "../common/asserts";

export class Size {
    constructor(
        private width: number,
        private height: number
    ) {
        assertGreaterOrEqualThan(width, 0);
        assertGreaterOrEqualThan(height, 0);
    }

    public getWidth(): number {
        return this.width;
    }

    public setWidth(width: number): Size {
        return new Size(width, this.height);
    }

    public getHeight(): number {
        return this.height;
    }

    public setHeight(height: number): Size {
        return new Size(this.width, height);
    }

    public getRatio(): number {
        return this.width / this.height;
    }
}