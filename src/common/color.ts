import { randomInt } from "./random";

const hexMap: {[key: number]: string} = {};

for(let i = 0; i < 256; i++) {
	hexMap[i] = i.toString(16);
	if (hexMap[i].length === 1) {
		hexMap[i] = '0' + hexMap[i];
	}
}

export class Color {
    constructor(
        private readonly red: number,
        private readonly green: number,
        private readonly blue: number
    ) {
        if (red > 255) {
            this.red = 255;
        } else if (red < 0) {
            this.red = 0;
        }

        if (green > 255) {
            this.green = 255;
        } else if (green < 0) {
            this.green = 0;
        }

        if (blue > 255) {
            this.blue = 255;
        } else if (blue < 0) {
            this.blue = 0;
        }
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
            Math.round(this.red * (1 - percent) + to.getRed() * percent),
            Math.round(this.green * (1 - percent) + to.getGreen() * percent),
            Math.round(this.blue * (1 - percent) + to.getBlue() * percent)
        );
    }

    toHexFormat(): string {
        return '#' + hexMap[this.red] + hexMap[this.green] + hexMap[this.blue];
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