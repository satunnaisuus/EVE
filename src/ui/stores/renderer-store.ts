import { action, makeObservable, observable, runInAction } from "mobx";
import { RenderMode } from "../../renderer/renderer";
import { WorkerRenderer } from "../../renderer/worker-renderer";
import { Data, PayloadData } from "../../simulation/data";
import { StepData } from "../../simulation/simulation";
import { initMouseInteractions } from "../interactions/mouse";
import { initTouchInteractions } from "../interactions/touch";
import { PaintMode } from "./paint-mode";
import { SimulationStore } from "./simulation-store";

const SCALE_FACTOR = 2;
const MAX_SCALE = 64;

const RenderModePayloadMap: {[Property in RenderMode]: PayloadData|null} = {
    default: null,
    energy: 'energy',
    lifetime: 'lifetime',
    supply: 'supply',
    genesis: 'genesis',
}

export class RendererStore {
    @observable
    private renderMode: RenderMode = 'default';

    @observable
    private renderTime = 0;

    private paintMode: PaintMode;

    private element: HTMLCanvasElement;

    private context: CanvasRenderingContext2D;

    private scale = 1;

    private offset: [number, number] = [0, 0];

    private state: StepData;

    private redrawId: number;

    private renderer: WorkerRenderer;

    private canvasDestroyListeners: (() => void)[] = [];

    private needRender = false;

    private rendering = false;

    private updatingState = false;

    private updateListeners: (() => void)[] = [];

    private needUpdate = false;

    constructor(
        private simulation: SimulationStore
    ) {
        this.renderer = new WorkerRenderer();
        this.paintMode = new PaintMode(simulation, this);

        makeObservable(this);
    }

    setElement(canvas: HTMLCanvasElement): void {
        if (this.element) {
            this.canvasDestroyListeners.forEach(listener => listener());
        }

        this.element = canvas;
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
    setRenderMode(mode: RenderMode): void {
        this.renderMode = mode;
        this.update(null, mode);
    }

    update(ready?: () => void, mode = this.renderMode): void {
        if (this.updatingState) {
            this.needUpdate = true;
            
            if (ready) {
                this.updateListeners.push(ready);
            }
            
            return;
        }

        const listeners = this.updateListeners;
        this.updateListeners = [];
        this.updatingState = true;

        this.simulation.getState(RenderModePayloadMap[mode]).then((state) => {
            this.setState(state);
            this.updatingState = false;
            this.requestRedraw();

            listeners.map(listener => listener());

            if (ready) {
                ready();
            }

            if (this.needUpdate) {
                this.needUpdate = false;
                this.update();
            }
        });
    }

    getRenderMode(): RenderMode {
        return this.renderMode;
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
        if (! this.element) {
            return;
        }

        const canvasWidth = this.element.width;
        const canvasHeight = this.element.height;
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
        if (this.paintMode.isEnabled()) {
            this.paint(x, y);
            return;
        }

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

    paint(x: number, y: number): void {
        this.paintMode.paint(
            Math.ceil((x - this.offset[0]) / this.scale) - 1,
            Math.ceil((y - this.offset[1]) / this.scale) - 1
        );
    }

    getPaintMode(): PaintMode {
        return this.paintMode;
    }

    private render(done: (data: ImageData) => void): void {
        if (
            ! this.element
            || ! this.state
            || ! this.element.width
            || ! this.element.height
            || RenderModePayloadMap[this.renderMode] !== this.state.payload
        ) {
            return;
        }

        this.rendering = true;

        this.renderer.render(
            done,
            Math.trunc(this.element.width),
            Math.trunc(this.element.height),
            this.offset[0],
            this.offset[1],
            this.scale,
            this.renderMode,
            new Data(
                new Uint8Array(this.state.buffer.slice(0)),
                this.state.payload,
                this.simulation.getOptions().width,
                this.simulation.getOptions().height
            )
        );
    }
}