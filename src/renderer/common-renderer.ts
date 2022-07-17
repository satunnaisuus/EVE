import { Color } from "../common/color";
import { Data } from "../simulation/data";
import { Renderer, RenderMode } from "./renderer";

const blackColor = Color.fromHex('#000000');
const lifetimeColor = Color.fromHex('#ffffff');
const energyColor = Color.fromHex('#F8CB2E');
const organismColor = Color.fromHex('#2155CD');
const organicColor = Color.fromHex('#F0E9D2');
const wallColor = Color.fromHex('#575757');
const redColor = Color.fromHex('#ff0000');

const ActionColors = [
    Color.fromHex('#ffffff'),
    Color.fromHex('#03fcc2'),
    Color.fromHex('#03cafc'),
    Color.fromHex('#aaf200'),
    Color.fromHex('#a705f7'),
    Color.fromHex('#ff0000'),
    Color.fromHex('#ff00f2'),
    Color.fromHex('#ffffff'),
    Color.fromHex('#00ff00'),
    Color.fromHex('#0000ff'),
];

const CELL_TYPE_EMPTY = 0;
const CELL_TYPE_ORGANISM = 1;
const CELL_TYPE_ORGANIC = 2;
const CELL_TYPE_WALL = 3;

const OrganismColor = {
    default: () => organismColor,

    lifetime: (lifeTime: number, lifitimeLimit: number) => (
        lifetimeColor.mix(blackColor, lifeTime / lifitimeLimit)
    ),

    energy: (energy: number, max: number) => (
        blackColor.mix(energyColor, energy / max)
    ),

    genesis: (r: number, g: number, b: number) => (
        new Color(r, g, b)
    ),

    supply: (r: number, g: number, b: number) => (
        new Color(r, g, b)
    ),

    attack: (count: number, max: number) => (
        blackColor.mix(redColor, count / max)
    ),

    children: (count: number, max: number) => (
        blackColor.mix(redColor, count / max)
    ),

    step: (count: number, max: number) => (
        blackColor.mix(redColor, count / max)
    ),

    action: (action: number) => (
        ActionColors[action]
    ),
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

        const renderCell = (x: number, y: number, color: Color) => {
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
                line.push(color.getRed(), color.getGreen(), color.getBlue(), 255);
            }

            const offsetX = x * 4;
            const widthOffset = width * 4;

            for (let i = 0; i < visibleHeight; i++) {
                imageData.data.set(line, widthOffset * (y + i) + offsetX);
            }
        }

        let maxPayloadValue = 0;
        let i = 0;
        if (mode === 'children' || mode === 'step' || mode === 'attack' ||  mode === 'lifetime' || mode === 'energy') {
            for (let x = 0; x < data.getWidth(); x++) {
                for (let y = 0; y < data.getHeight(); y++) {
                    if (array[i] === 1 && maxPayloadValue < array[i + 1]) {
                        maxPayloadValue = array[i + 1];
                    }
                    
                    i += data.getItemLength();
                }
            }
        }

        i = 0;
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
                    case CELL_TYPE_EMPTY:
                        break;
                    case CELL_TYPE_ORGANISM:
                        let color: Color;

                        if (mode === 'energy') {
                            color = OrganismColor.energy(array[i + 1], maxPayloadValue);
                        } else if (mode === 'lifetime') {
                            color = OrganismColor.lifetime(array[i + 1], maxPayloadValue);
                        } else if (mode === 'genesis') {
                            color = OrganismColor.genesis(array[i + 1], array[i + 2], array[i + 3]);
                        } else if (mode === 'supply') {
                            color = OrganismColor.supply(array[i + 1], array[i + 2], array[i + 3]);
                        } else if (mode === 'action') {
                            color = OrganismColor.action(array[i + 1]);
                        } else if (mode === 'children') {
                            color = OrganismColor.children(array[i + 1], maxPayloadValue);
                        } else if (mode === 'attack') {
                            color = OrganismColor.attack(array[i + 1], maxPayloadValue);
                        } else if (mode === 'step') {
                            color = OrganismColor.step(array[i + 1], maxPayloadValue);
                        } else {
                            color = OrganismColor.default();
                        }

                        renderCell(cursorX, cursorY, color);
                        break;
                    case CELL_TYPE_ORGANIC:
                        renderCell(cursorX, cursorY, organicColor);
                        break;
                    case CELL_TYPE_WALL:
                        renderCell(cursorX, cursorY, wallColor);
                        break;
                }

                i += data.getItemLength();
            }
        }

        done(imageData);
    }
}