import { Data } from '../simulation/data';
import { Renderer, RenderMode } from './renderer';
import RendererWorker from './renderer.worker.ts';

export class WorkerRenderer implements Renderer {
    private worker: RendererWorker;

    private listeners: ((value: ImageData) => void)[] = [];

    private lastId = 0;
    
    constructor() {
        this.worker = new RendererWorker();

        this.worker.addEventListener('message', (ev: MessageEvent<{data: ImageData, id: number}>) => {
            this.listeners[ev.data.id](ev.data.data);
            delete this.listeners[ev.data.id];
        });
    }

    render(width: number, height: number, offsetX: number, offsetY: number, scale: number, mode: RenderMode, data: Data): Promise<ImageData> {
        const id = this.lastId++;

        this.worker.postMessage({
            id: id,
            width: width,
            height: height,
            offsetX: offsetX,
            offsetY: offsetY,
            scale: scale,
            mode: mode,
            data: {
                width: data.getWidth(),
                height: data.getHeight(),
                payload: data.getPayload(),
                array: data.getArray(),
            }
        }, [data.getArray().buffer]);

        return new Promise((resolve) => {
            this.listeners[id] = resolve;
        });
    }

    terminate(): void {
        this.worker.terminate();
    }
}