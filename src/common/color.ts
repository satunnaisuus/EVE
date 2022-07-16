import { assertGreaterOrEqualThan, assertLessOrEqualThan } from "./asserts";
import { randomInt } from "./random";

export class Color {
    private readonly hex: string;

    constructor(
        private readonly red: number,
        private readonly green: number,
        private readonly blue: number
    ) {
        if (red > 255) {
            red = 255;
        } else if (red < 0) {
            red = 0;
        }

        if (green > 255) {
            green = 255;
        } else if (green < 0) {
            green = 0;
        }

        if (blue > 255) {
            blue = 255;
        } else if (blue < 0) {
            blue = 0;
        }

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
        //assertGreaterOrEqualThan(percent, 0);
        //assertLessOrEqualThan(percent, 1);

        return new Color(
            Math.round(this.red * (1 - percent) + to.getRed() * percent),
            Math.round(this.green * (1 - percent) + to.getGreen() * percent),
            Math.round(this.blue * (1 - percent) + to.getBlue() * percent)
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

    toArray(): [number, number, number] {
        return [this.red, this.green, this.blue];
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