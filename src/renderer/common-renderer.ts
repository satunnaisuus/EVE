import { Color } from "../common/color";
import { Data } from "../simulation/data";
import { Renderer } from "./renderer";

export class CommonRenderer implements Renderer {
    constructor() {

    }

    render(width: number, height: number, offsetX: number, offsetY: number, scale: number, data: Data): Promise<ImageData> {
        return new Promise(function (resolve, reject) {
            const array = data.getArray();
            const payload = data.getPayload();
            
            const empty = (new Uint8ClampedArray(width * height * 4)).map(function (e, i) {
                return i % 4 === 3 ? 255 : 0;
            });

            const imageData = new ImageData(empty, width, height);

            // const imageData = new ImageData(width, height);
            

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

            const yellow = Color.fromHex('#ffff00');
            const black = Color.fromHex('#000000');

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
                            renderCell(cursorX, cursorY, yellow.mix(black, array[i + 1] / 100).toArray());
                            break;
                        case 2: //organic
                            renderCell(cursorX, cursorY, [255, 0, 0]);
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