import { action, makeObservable, observable, runInAction } from "mobx";
import { RenderMode } from "../../renderer/renderer";
import { WorkerRenderer } from "../../renderer/worker-renderer";
import { Data } from "../../simulation/data";
import { CellPayload, StepData } from "../../simulation/simulation";
import { initMouseInteractions } from "../interactions/mouse";
import { initTouchInteractions } from "../interactions/touch";
import { SimulationStore } from "./simulation-store";

const SCALE_FACTOR = 2;
const MAX_SCALE = 64;

export class CanvasRenderer {
    @observable
    private mode: RenderMode = 'default';

    @observable
    private renderTime: number = 0;

    private canvas: HTMLCanvasElement;

    private context: CanvasRenderingContext2D;

    private scale: number = 1;

    private offset: [number, number] = [0, 0];

    private state: StepData;

    private redrawId: number;

    private renderer: WorkerRenderer;

    private canvasDestroyListeners: (() => any)[] = [];

    private needRender: boolean = false;

    private rendering: boolean = false;

    constructor(
        private simulation: SimulationStore
    ) {
        this.renderer = new WorkerRenderer();

        makeObservable(this);
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
        if (this.rendering) {
            this.needRender = true;
            return;
        }

        const renderStartTime = +Date.now();

        this.render((imageData) => {
            if (this.redrawId) {
                cancelAnimationFrame(this.redrawId);
            }

            this.redrawId = requestAnimationFrame(() => {
                this.context.putImageData(imageData, 0, 0);

                runInAction(() => {
                    this.renderTime = +Date.now() - renderStartTime;
                });

                this.redrawId = null;
                this.rendering = false;

                if (this.needRender) {
                    this.needRender = false;
                    this.requestRedraw();
                }
            });
        });
    }

    @action
    setMode(mode: RenderMode): void {
        this.mode = mode;
        this.update(mode).then(() => {});
    }

    async update(mode = this.mode): Promise<void> {
        let payload: CellPayload;

        if (mode === 'energy') {
            payload = 'energy';
        } else if (mode === 'lifetime') {
            payload = 'lifetime';
        } else if (mode === 'genesis') {
            payload = 'genesis';
        } else {
            payload = null;
        }

        this.setState(await this.simulation.getState(payload));
        this.requestRedraw();
    }

    getMode(): RenderMode {
        return this.mode;
    }

    getScale(): number {
        return this.scale;
    }

    setScale(scale: number, redraw = true): void {
        if (scale < 1) {
            this.scale = 1;
        } else if (scale > MAX_SCALE) {
            this.scale = MAX_SCALE;
        } else {
            this.scale = Math.round(scale);
        }

        if (redraw) {
            this.requestRedraw();
        }
    }

    scaleUp(redraw = true): void {
        this.setScale(this.getScale() * SCALE_FACTOR, redraw);
    }

    scaleDown(redraw = true): void {
        this.setScale(this.getScale() / SCALE_FACTOR, redraw);
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
        const gameRatio = simulationWidth / simulationHeight;
        const canvasRatio = canvasWidth / canvasHeight;
        const canvasSize = gameRatio >= canvasRatio ? canvasWidth : canvasHeight;
        const gameSize = gameRatio >= canvasRatio ? simulationWidth : simulationHeight;

        for (let i = 1; i <= MAX_SCALE; i++) {
            if (canvasSize < i * gameSize) {
                this.scale = i === 1 ? 1 : i - 1;
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
    }

    terminate(): void {
        this.renderer.terminate();
    }

    getRenderTime(): number {
        return this.renderTime;
    }

    click(x: number, y: number): void {
        const cellX = Math.ceil((x - this.offset[0]) / this.scale) - 1;
        if (cellX < 0 || cellX >= this.simulation.getOptions().width) {
            return;
        }

        const cellY = Math.ceil((y - this.offset[1]) / this.scale) - 1;
        if (cellY < 0 || cellY >= this.simulation.getOptions().height) {
            return;
        }

        this.simulation.getSelectedCell().select(cellX, cellY);
    }

    private render(done: (data: ImageData) => any): void {
        if (! this.canvas || ! this.state || ! this.canvas.width || ! this.canvas.height) {
            return;
        }

        this.rendering = true;

        this.renderer.render(
            done,
            Math.trunc(this.canvas.width),
            Math.trunc(this.canvas.height),
            this.offset[0],
            this.offset[1],
            this.scale,
            this.mode,
            new Data(
                new Uint8Array(this.state.buffer.slice(0)),
                this.state.payload,
                this.simulation.getOptions().width,
                this.simulation.getOptions().height
            )
        );
    }
}