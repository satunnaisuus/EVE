import { Game } from "../game/game";
import { StategyInterface } from "./strategy-interface";
import { DefaultStrategy } from "./strategy/default-strategy";
import { EnergyStrategy } from "./strategy/energy-strategy";
import { GenesisStrategy } from "./strategy/genesis-strategy";

export type RenderStrategy = 'default' | 'energy' | 'genesis';

const SCALE_FACTOR = 1.5;
const MAX_SCALE = 40;

export class CanvasRenderer {
    private context: CanvasRenderingContext2D;

    private renderStrategy: StategyInterface;

    private handlingStep: boolean = true;

    private width: number;

    private height: number;

    private scale: number = 1;

    private offset = [0, 0];

    private moving = false;

    private movingStart = [0, 0];

    private lastStepGrid: any;

    private redrawId: number;

    private resizeObserver: ResizeObserver;

    constructor(
        private canvas: HTMLCanvasElement,
        private game: Game,
        renderStrategy: RenderStrategy
    ) {
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.context = canvas.getContext('2d');
        this.saveGridState();
        this.setRenderStrategy(renderStrategy);
        this.fitCenter();
        this.initHandlingGameStep();
        this.initHandlingCanvasResize();
        this.initHandlingScale();
        this.initHandlingMove();
    }

    enableHandlingStep(): void {
        this.handlingStep = true;
    }

    disableHandlingStep(): void {
        this.handlingStep = false;
    }

    setRenderStrategy(strategy: RenderStrategy): void {
        if (strategy === 'default') {
            this.renderStrategy = new DefaultStrategy(this.context);
        } else if (strategy === 'energy') {
            this.renderStrategy = new EnergyStrategy(this.context);
        } else if (strategy === 'genesis') {
            this.renderStrategy = new GenesisStrategy(this.context);
        }

        this.requestRedraw();
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    setScale(scale: number): void {
        if (scale < 1) {
            this.scale = 1;
        } else if (scale > MAX_SCALE) {
            this.scale = MAX_SCALE;
        } else {
            this.scale = Math.round(scale);
        }
    }

    fitCenter(): void {
        const size = this.game.getGrid().getSize();
        const gameRatio = size.getRatio();
        const canvasRatio = this.width / this.height;
        const canvasSize = gameRatio >= canvasRatio ? this.width : this.height;
        const gameSize = gameRatio >= canvasRatio ? size.getWidth() : size.getHeight();

        for (let i = 1; i <= MAX_SCALE; i++) {
            if (canvasSize < i * gameSize) {
                this.setScale(i - 1);
                break;
            }
        }

        this.offset[0] = Math.ceil((this.width - this.scale * size.getWidth()) / 2);
        this.offset[1] = Math.ceil((this.height - this.scale * size.getHeight()) / 2);
    }

    requestRedraw() {
        if (this.redrawId) {
            return;
        }

        this.redrawId = window.requestAnimationFrame(() => {
            this.render();
            this.redrawId = null;
        });
    }

    private render() {
        if (! this.renderStrategy) {
            return;
        }

        this.clear();
        
        for (const {x, y, cell} of this.lastStepGrid) {
            const cursorX = this.offset[0] + x * this.scale;
            if (cursorX + this.scale < 0 || cursorX >= this.width) {
                continue;
            }

            const cursorY = this.offset[1] + y * this.scale;
            if (cursorY + this.scale < 0 || cursorY >= this.height) {
                continue;
            }

            cell.visit(
                this.renderStrategy.createVisitor(cursorX, cursorY, this.scale)
            );
        }
    }

    private saveGridState(): void {
        this.lastStepGrid = Array.from(this.game.getGrid());
    }

    private initHandlingGameStep(): void {
        this.game.subscribe('step', (e) => {
            if (this.handlingStep) {
                this.saveGridState();
                this.requestRedraw();
            }
        });
    }

    private initHandlingCanvasResize(): void {
        this.resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const needFitToCenter = this.width === 0 || this.height === 0;
                this.width = this.canvas.width;
                this.height = this.canvas.height;
                needFitToCenter && this.fitCenter();
            }

            this.requestRedraw();
        });

        this.resizeObserver.observe(this.canvas);
    }

    private initHandlingScale(): void {
        this.canvas.addEventListener('wheel', (e) => {
            const decrease = e.deltaY > 0;

            if (decrease && this.scale === 1) {
                return;
            }

            if (! decrease && this.scale === MAX_SCALE) {
                return;
            }

            const xs = Math.round((e.clientX - this.offset[0]) / this.scale);
            const ys = Math.round((e.clientY - this.offset[1]) / this.scale);

            if (e.deltaY < 0) {
                this.setScale(this.scale * SCALE_FACTOR);
            } else if (this.scale > 1) {
                this.setScale(this.scale / SCALE_FACTOR);
            }

            this.offset[0] = e.clientX - xs * this.scale;
            this.offset[1] = e.clientY - ys * this.scale;

            this.requestRedraw();
        });
    }

    private initHandlingMove(): void {
        this.canvas.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.moving = true;
            this.movingStart = [e.clientX - this.offset[0], e.clientY - this.offset[1]];
        });

        this.canvas.addEventListener('mouseup', (e) => {
            this.moving = false;
        });

        this.canvas.addEventListener('mousemove', (e) => {
            e.preventDefault();

            if (! this.moving) {
                return;
            }

            this.offset = [
                e.clientX - this.movingStart[0],
                e.clientY - this.movingStart[1],
            ];

            this.requestRedraw();
        });
    }
}