import { AbstractCell } from "../simulation/cell/abstract-cell";
import { Simulation } from "../simulation/simulation";
import { initMouseInteractions } from "./interactions/mouse";
import { initTouchInteractions } from "./interactions/touch";
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

    private offset: [number, number] = [0, 0];

    private cells: {x: number, y: number, cell: AbstractCell}[];

    private redrawId: number;

    private resizeObserver: ResizeObserver;

    constructor(
        private canvas: HTMLCanvasElement,
        private simulation: Simulation,
        renderStrategy: RenderStrategy
    ) {
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.context = canvas.getContext('2d');
        this.saveGridState();
        this.setRenderStrategy(renderStrategy);
        this.fitCenter();
        this.initHandlingSimulationStep();
        this.initHandlingCanvasResize();
        const clearMouseInteractions = initMouseInteractions(canvas, this);
        const clearTouchInteractions = initTouchInteractions(canvas, this);

        simulation.subscribe('end', () => {
            clearMouseInteractions();
            clearTouchInteractions();
        });
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
        const size = this.simulation.getGrid().getSize();
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

        this.setOffset(
            Math.ceil((this.width - this.scale * size.getWidth()) / 2),
            Math.ceil((this.height - this.scale * size.getHeight()) / 2)
        );
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
        
        for (const {x, y, cell} of this.cells) {
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
        this.cells = Array.from(this.simulation.getGrid());
    }

    private initHandlingSimulationStep(): void {
        this.simulation.subscribe('step', (e) => {
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
}