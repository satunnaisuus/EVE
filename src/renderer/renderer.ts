import { Data } from "../simulation/data";

export type RenderMode = 'default' | 'energy' | 'lifetime' | 'genesis' | 'supply';

export interface Renderer {
    render(
        done: (data: ImageData) => any,
        width: number,
        height: number,
        offsetX: number,
        offsetY: number,
        scale: number,
        mode: RenderMode,
        data: Data
    ): void;
}