import { Color } from "../common/color";
import { Data } from "../simulation/data";
import { CellType } from "../simulation/types/cells";
import { Colors } from "./colors";
import { Renderer, RenderMode } from "./renderer";

const OrganismColor = {
    default: () => Colors.organism,

    lifetime: (lifeTime: number, max: number) => (
        Colors.lifetimeMax.mix(Colors.lifetimeMin, lifeTime / max)
    ),

    energy: (energy: number, max: number) => (
        Colors.energyMin.mix(Colors.energyMax, energy / max)
    ),

    genesis: (r: number, g: number, b: number) => (
        new Color(r, g, b)
    ),

    supply: (r: number, g: number, b: number) => (
        new Color(r, g, b)
    ),

    attack: (count: number, max: number) => (
        Colors.aggressionMin.mix(Colors.aggressionMax, count / max)
    ),

    children: (count: number, max: number) => (
        Colors.childrenMin.mix(Colors.childrenMax, count / max)
    ),

    step: (count: number, max: number) => (
        Colors.stepMin.mix(Colors.stepMax, count / max)
    ),

    action: (action: number) => (
        Colors.actions[action]
    ),
}

export class CommonRenderer implements Renderer {
    private empty: ImageData;

    render(
        done: (data: ImageData) => void,
        width: number,
        height: number,
        offsetX: number,
        offsetY: number,
        scale: number,
        mode: RenderMode,
        data: Data
    ): void {
        if (! this.empty || this.empty.width !== width || this.empty.height !== height) {
            this.createEmpty(width, height);
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

        const array = data.getArray();

        let maxPayloadValue = 0;
        let i = 0;
        if (mode === 'lifetime' || mode === 'energy') {
            for (let x = 0; x < data.getWidth(); x++) {
                for (let y = 0; y < data.getHeight(); y++) {
                    if (array[i] === 1 && maxPayloadValue < array[i + 1]) {
                        maxPayloadValue = array[i + 1];
                    }
                    
                    i += data.getItemLength(array[i]);
                }
            }
        }

        i = 0;
        for (let x = 0; x < data.getWidth(); x++) {
            for (let y = 0; y < data.getHeight(); y++) {
                const cursorX = offsetX + x * scale;
                if (cursorX + scale < 0 || cursorX >= imageData.width) {
                    i += data.getItemLength(array[i]);
                    continue;
                }

                const cursorY = offsetY + y * scale;
                if (cursorY + scale < 0 || cursorY >= imageData.height) {
                    i += data.getItemLength(array[i]);
                    continue;
                }

                switch (array[i]) {
                    case CellType.EMPTY:
                        break;
                    case CellType.ORGANISM:
                        if (mode === 'energy') {
                            renderCell(
                                cursorX,
                                cursorY,
                                OrganismColor.energy(array[i + 1], maxPayloadValue)
                            );
                        } else if (mode === 'lifetime') {
                            renderCell(
                                cursorX,
                                cursorY,
                                OrganismColor.lifetime(array[i + 1], maxPayloadValue)
                            );
                        } else if (mode === 'genesis') {
                            renderCell(
                                cursorX,
                                cursorY,
                                OrganismColor.genesis(array[i + 1], array[i + 2], array[i + 3])
                            );
                        } else if (mode === 'supply') {
                            renderCell(
                                cursorX,
                                cursorY,
                                OrganismColor.supply(array[i + 1], array[i + 2], array[i + 3])
                            );
                        } else {
                            renderCell(cursorX, cursorY, OrganismColor.default());
                        }

                        break;
                    case CellType.ORGANIC:
                        renderCell(cursorX, cursorY, Colors.organic);
                        break;
                    case CellType.WALL:
                        renderCell(cursorX, cursorY, Colors.wall);
                        break;
                }

                i += data.getItemLength(array[i]);
            }
        }

        done(imageData);
    }

    private createEmpty(width: number, height: number): void {
        this.empty = new ImageData(
            (new Uint8ClampedArray(width * height * 4)).map((_, i) => i % 4 === 3 ? 255 : 0),
            width,
            height,
        );
    }
}