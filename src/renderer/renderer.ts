import { Data } from "../simulation/data";

export interface Renderer {
    render(width: number, height: number, offsetX: number, offsetY: number, scale: number, data: Data): Promise<ImageData>;
}