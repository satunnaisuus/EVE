import { assertInteger } from "./asserts";

export default class Int {
    constructor(private value: number) {
        assertInteger(value);
    }

    public getValue(): number {
        return this.value;
    }

    [Symbol.toPrimitive]() {
        return this.getValue();
    }
}