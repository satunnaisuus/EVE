import { assertGreaterOrEqualThan, assertLessOrEqualThan } from "./asserts";
import { randomInt } from "./random";

export default class Color {
    private hex: string;

    constructor(
        private red: number,
        private green: number,
        private blue: number
    ) {
        assertGreaterOrEqualThan(red, 0);
        assertGreaterOrEqualThan(green, 0);
        assertGreaterOrEqualThan(blue, 0);

        assertLessOrEqualThan(red, 255);
        assertLessOrEqualThan(green, 255);
        assertLessOrEqualThan(blue, 255);
    }

    getRed(): number {
        return this.red;
    }

    getGreen(): number {
        return this.green;
    }

    getBlue(): number {
        return this.blue;
    }

    toHexFormat(): string {
        if (this.hex) {
            return this.hex;
        }

        return this.hex = '#' + this.red.toString(16) + this.green.toString(16) + this.blue.toString(16);
    }

    static random(): Color {
        return new Color(randomInt(0, 255), randomInt(0, 255), randomInt(0, 255));
    }
}