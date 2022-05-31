import { Renderer } from "../../renderer/renderer";
import { WorkerRenderer } from "../../renderer/worker-renderer";
import { Data } from "../../simulation/data";
import { StepData } from "../../simulation/simulation";
import { initMouseInteractions } from "../interactions/mouse";
import { initTouchInteractions } from "../interactions/touch";
import { SimulationStore } from "./simulation-store";

const SCALE_FACTOR = 1.5;
const MAX_SCALE = 40;

export class CanvasRenderer {
    private canvas: HTMLCanvasElement;

    private context: CanvasRenderingContext2D;

    private scale: number = 1;

    private offset: [number, number] = [0, 0];

    private state: StepData;

    private redrawId: number;

    private renderer: WorkerRenderer;

    private canvasDestroyListeners: (() => any)[] = [];

    constructor(
        private simulation: SimulationStore
    ) {
        this.renderer = new WorkerRenderer();
    }

    setCanvas(canvas: HTMLCanvasElement): void {
        if (this.canvas) {
            this.canvasDestroyListeners.forEach(listener => listener());
        }

        this.canvas = canvas;
        this.context = canvas.getContext('2d', {alpha: false});

        this.canvasDestroyListeners.push(initMouseInteractions(canvas, this));
        this.canvasDestroyListeners.push(initTouchInteractions(canvas, this));

        this.fitCenter();
    }

    requestRedraw(): void {
        this.render()
            .then((imageData) => {
                if (this.redrawId) {
                    cancelAnimationFrame(this.redrawId);
                }

                this.redrawId = requestAnimationFrame(() => {
                    this.context.putImageData(imageData, 0, 0);
                    this.redrawId = null;
                });
            })
        ;
    }

    getScale(): number {
        return this.scale;
    }

    setScale(scale: number): void {
        if (scale < 1) {
            this.scale = 1;
        } else if (scale > MAX_SCALE) {
            this.scale = MAX_SCALE;
        } else {
            this.scale = Math.round(scale);
        }

        this.requestRedraw();
    }

    scaleUp(): void {
        this.setScale(this.getScale() * SCALE_FACTOR);
    }

    scaleDown(): void {
        this.setScale(this.getScale() / SCALE_FACTOR);
    }

    getOffset(): [number, number] {
        return this.offset;
    }

    setOffset(x: number, y: number): void {
        this.offset = [Math.round(x), Math.round(y)];

        this.requestRedraw();
    }

    fitCenter(): void {
        if (! this.canvas) {
            return;
        }

        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        const simulationWidth = this.simulation.getOptions().width;
        const simulationHeight = this.simulation.getOptions().height;
        const gameRatio = canvasWidth / simulationHeight;
        const canvasRatio = canvasWidth / canvasHeight;
        const canvasSize = gameRatio >= canvasRatio ? canvasWidth : canvasHeight;
        const gameSize = gameRatio >= canvasRatio ? simulationWidth : simulationHeight;

        for (let i = 1; i <= MAX_SCALE; i++) {
            if (canvasSize < i * gameSize) {
                this.scale = i - 1;
                break;
            }
        }

        this.setOffset(
            Math.ceil((canvasWidth - this.scale * simulationWidth) / 2),
            Math.ceil((canvasHeight - this.scale * simulationHeight) / 2)
        );
    }

    setState(state: StepData): void {
        this.state = state;
        this.requestRedraw();
    }

    terminate(): void {
        this.renderer.terminate();
    }

    private render(): Promise<ImageData> {
        return new Promise((resolve, reject) => {
            if (! this.canvas) {
                return reject('canvas is null');
            }

            if (! this.state) {
                return reject('state is null');
            }
    
            if (! this.canvas.width || ! this.canvas.height) {
                return reject('width or height = 0');
            }

            this.renderer.render(
                this.canvas.width,
                this.canvas.height,
                this.offset[0],
                this.offset[1],
                this.scale,
                new Data(
                    new Uint8Array(this.state.buffer.slice(0)),
                    this.state.payload,
                    this.simulation.getOptions().width,
                    this.simulation.getOptions().height
                )
            )
            .then(resolve)
            .catch(reject);
        });
    }
}