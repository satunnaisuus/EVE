import { Color } from "../common/color";
import { Data } from "../simulation/data";
import { Renderer, RenderMode } from "./renderer";

const blackColor = Color.fromHex('#000000');
const lifetimeColor = Color.fromHex('#ffffff');
const energyColor = Color.fromHex('#F8CB2E');
const organismColor = Color.fromHex('#2155CD');
const organicColor = Color.fromHex('#F0E9D2');

const PayloadByModeMap = {
    default: null as any,
    lifetime: 'lifetime',
    energy: 'energy',
};

export class CommonRenderer implements Renderer {
    private empty: ImageData;

    constructor() {

    }

    render(width: number, height: number, offsetX: number, offsetY: number, scale: number, mode: RenderMode, data: Data): Promise<ImageData> {
        return new Promise((resolve) => {
            const array = data.getArray();
            const payload = data.getPayload();
            
            const payloadDataIndex = payload.indexOf(PayloadByModeMap[mode]) + 1;

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
                        i += payload.length + 1;
                        continue;
                    }

                    const cursorY = offsetY + y * scale;
                    if (cursorY + scale < 0 || cursorY >= imageData.height) {
                        i += payload.length + 1;
                        continue;
                    }

                    switch (array[i]) {
                        case 0: //empty
                            break;
                        case 1: //organism
                            let color: Color; 

                            if (mode === 'energy') {
                                color = energyColor.mix(blackColor, array[i + payloadDataIndex] / 100);
                            } else if (mode === 'lifetime') {
                                color = blackColor.mix(lifetimeColor, array[i + payloadDataIndex] / 100);
                            } else {
                                color = organismColor;
                            }

                            renderCell(cursorX, cursorY, color.toArray());
                            break;
                        case 2: //organic
                            renderCell(cursorX, cursorY, organicColor.toArray());
                            break;
                        case 3: //wall
                            break;
                    }
                    i += payload.length + 1;
                }
            }

            resolve(imageData);
        });
    }
}