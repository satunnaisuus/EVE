import PositiveInt from "../common/positive-int";

export class Size {
    constructor(
        private width: PositiveInt,
        private height: PositiveInt
    ) {
        
    }

    public getWidth(): PositiveInt {
        return this.width;
    }

    public setWidth(width: PositiveInt): Size {
        return new Size(width, this.height);
    }

    public getHeight(): PositiveInt {
        return this.height;
    }

    public setHeight(height: PositiveInt): Size {
        return new Size(this.width, height);
    }

    public getRatio(): number {
        return this.width.getValue() / this.height.getValue();
    }
}