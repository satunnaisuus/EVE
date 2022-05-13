import { assertGreaterOrEqualThan, assertLessOrEqualThan } from "./asserts";
import { randomInt } from "./random";

export class Color {
    private readonly hex: string;

    constructor(
        private readonly red: number,
        private readonly green: number,
        private readonly blue: number
    ) {
        assertGreaterOrEqualThan(red, 0);
        assertGreaterOrEqualThan(green, 0);
        assertGreaterOrEqualThan(blue, 0);

        assertLessOrEqualThan(red, 255);
        assertLessOrEqualThan(green, 255);
        assertLessOrEqualThan(blue, 255);

        const segement = (v: string) => v.length === 1 ? '0' + v : v;

        this.hex = '#'
            + segement(this.red.toString(16))
            + segement(this.green.toString(16))
            + segement(this.blue.toString(16));
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
        assertGreaterOrEqualThan(percent, 0);
        assertLessOrEqualThan(percent, 1);

        return new Color(
            Math.round(this.red * percent + to.getRed() * (1 - percent)),
            Math.round(this.green * percent + to.getGreen() * (1 - percent)),
            Math.round(this.blue * percent + to.getBlue() * (1 - percent))
        );
    }

    toHexFormat(): string {
        return this.hex;
    }

    equals(color: Color): boolean {
        return this.blue === color.getBlue()
            && this.red === color.getRed()
            && this.green === color.getGreen();
    }

    static random(): Color {
        return new Color(randomInt(0, 255), randomInt(0, 255), randomInt(0, 255));
    }

    static fromHex(value: string): Color {
        if (value.startsWith('#')) {
            value = value.slice(1);
        }

        return new Color(
            parseInt(value.slice(0, 2), 16),
            parseInt(value.slice(2, 4), 16),
            parseInt(value.slice(4, 6), 16)
        );
    }
}