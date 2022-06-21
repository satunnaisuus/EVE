import { Color } from "../common/color";
import { Data } from "../simulation/data";
import { Renderer, RenderMode } from "./renderer";

const blackColor = Color.fromHex('#000000');
const lifetimeColor = Color.fromHex('#ffffff');
const energyColor = Color.fromHex('#F8CB2E');
const organismColor = Color.fromHex('#2155CD');
const organicColor = Color.fromHex('#F0E9D2');

const OrganismColor = {
    default: () => organismColor,

    lifetime: (lifeTime: number, lifitimeLimit: number) => (
        blackColor.mix(lifetimeColor, lifeTime / lifitimeLimit)
    ),

    energy: (energy: number) => (
        energyColor.mix(blackColor, energy / 255)
    ),

    genesis: (r: number, g: number, b: number) => (
        new Color(r, g, b)
    )
}

export class CommonRenderer implements Renderer {
    private empty: ImageData;

    constructor() {

    }

    render(done: (data: ImageData) => any, width: number, height: number, offsetX: number, offsetY: number, scale: number, mode: RenderMode, data: Data): void {
        const array = data.getArray();

        if (! this.empty || this.empty.width !== width || this.empty.height !== height) {
            this.empty = new ImageData(
                (new Uint8ClampedArray(width * height * 4)).map((_, i) => i % 4 === 3 ? 255 : 0),
                width,
                height,
            );
        }
        
        const imageData = new ImageData(
            new Uint8ClampedArray(this.empty.data),
            width,
            height
        );

        const renderCell = (x: number, y: number, color: [number, number, number]) => {
            const line = [];

            let visibleWidth = scale;
            let visibleHeight = scale;

            if (x < 0) {
                visibleWidth += x;
                x = 0;
            }

            if (y < 0) {
                visibleHeight += y;
                y = 0;
            }

            if (x + scale >= imageData.width) {
                visibleWidth = (imageData.width - x);
            }

            if (y + scale >= imageData.height) {
                visibleHeight = (imageData.height - y);
            }
            
            for (let i = 0; i < visibleWidth; i++) {
                line.push(color[0], color[1], color[2], 255);
            }

            const offsetX = x * 4;
            const widthOffset = width * 4;

            for (let i = 0; i < visibleHeight; i++) {
                imageData.data.set(line, widthOffset * (y + i) + offsetX);
            }
        }

        let i = 0;

        for (let x = 0; x < data.getWidth(); x++) {
            for (let y = 0; y < data.getHeight(); y++) {
                const cursorX = offsetX + x * scale;
                if (cursorX + scale < 0 || cursorX >= imageData.width) {
                    i += data.getItemLength();
                    continue;
                }

                const cursorY = offsetY + y * scale;
                if (cursorY + scale < 0 || cursorY >= imageData.height) {
                    i += data.getItemLength();
                    continue;
                }

                switch (array[i]) {
                    case 0: //empty
                        break;
                    case 1: //organism
                        let color: Color;

                        if (mode === 'energy') {
                            color = OrganismColor.energy(array[i + 1]);
                        } else if (mode === 'lifetime') {
                            color = OrganismColor.lifetime(array[i + 1], 255);
                        } else if (mode === 'genesis') {
                            color = OrganismColor.genesis(array[i + 1], array[i + 2], array[i + 3]);
                        } else {
                            color = OrganismColor.default();
                        }

                        renderCell(cursorX, cursorY, color.toArray());
                        break;
                    case 2: //organic
                        renderCell(cursorX, cursorY, organicColor.toArray());
                        break;
                    case 3: //wall
                        break;
                }

                i += data.getItemLength();
            }
        }

        done(imageData);
    }
}