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

    mix(to: Color, percent: number): Color {
        return new Color(
            Math.round(this.red * percent + to.getRed() * (1 - percent)),
            Math.round(this.green * percent + to.getGreen() * (1 - percent)),
            Math.round(this.blue * percent + to.getBlue() * (1 - percent))
        );
    }

    toHexFormat(): string {
        if (this.hex) {
            return this.hex;
        }

        const segement = (v: string) => v.length === 1 ? '0' + v : v;

        return this.hex = '#'
            + segement(this.red.toString(16))
            + segement(this.green.toString(16))
            + segement(this.blue.toString(16));
    }

    static random(): Color {
        return new Color(randomInt(0, 255), randomInt(0, 255), randomInt(0, 255));
    }

    static fromHex(value: string): Color {
        if (value.startsWith('#')) {
            value = value.slice(1);
        }

        const r = parseInt(value.slice(0, 2), 16);
        const g = parseInt(value.slice(2, 4), 16);
        const b = parseInt(value.slice(4, 6), 16);

        return new Color(r, g, b);
    }
}