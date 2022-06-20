import { render } from "react-dom";
import { Data } from "../simulation/data";

export type RenderMode = 'default' | 'energy' | 'lifetime' | 'genesis';

export interface Renderer {
    render(width: number, height: number, offsetX: number, offsetY: number, scale: number, mode: RenderMode, data: Data): Promise<ImageData>;
}