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

    private disabled: boolean;

    private scale: number = 1;

    private offset = [0, 0];

    private panning = false;

    private panningStart = [0, 0];

    constructor(
        private canvas: HTMLCanvasElement,
        private game: Game,
        renderStrategy: RenderStrategy
    ) {
        this.context = canvas.getContext('2d');
        this.clear();
        this.setRenderStrategy(renderStrategy);

        canvas.addEventListener('wheel', (e) => {
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
        });

        canvas.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.panning = true;
            this.panningStart = [e.clientX - this.offset[0], e.clientY - this.offset[1]];
        });

        canvas.addEventListener('mouseup', (e) => {
            this.panning = false;
        });

        canvas.addEventListener('mousemove', (e) => {
            e.preventDefault();

            if (! this.panning) {
                return;
            }

            this.offset = [
                e.clientX - this.panningStart[0],
                e.clientY - this.panningStart[1],
            ];
        });

        this.fitCenter();
    }

    render() {
        if (! this.renderStrategy || this.disabled) {
            return;
        }

        this.clear();
        
        for (const {x, y, cell} of this.game.getGrid()) {
            const cursorX = this.offset[0] + x * this.scale;
            if (cursorX + this.scale < 0 || cursorX >= this.canvas.width) {
                continue;
            }

            const cursorY = this.offset[1] + y * this.scale;
            if (cursorY + this.scale < 0 || cursorY >= this.canvas.height) {
                continue;
            }

            cell.visit(
                this.renderStrategy.createVisitor(cursorX, cursorY, this.scale)
            );
        }
    }

    enable(): void {
        this.disabled = false;
    }

    disable(): void {
        this.disabled = true;
    }

    setRenderStrategy(strategy: RenderStrategy): void {
        if (strategy === 'default') {
            this.renderStrategy = new DefaultStrategy(this.context);
        } else if (strategy === 'energy') {
            this.renderStrategy = new EnergyStrategy(this.context);
        } else if (strategy === 'genesis') {
            this.renderStrategy = new GenesisStrategy(this.context);
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
        const canvas = this.canvas;
        const size = this.game.getGrid().getSize();
        const gameRatio = size.getRatio();
        const canvasRatio = canvas.width / canvas.height;
        const canvasSize = gameRatio >= canvasRatio ? this.canvas.width : this.canvas.height;
        const gameSize = gameRatio >= canvasRatio ? size.getWidth() : size.getHeight();

        for (let i = 1; i <= MAX_SCALE; i++) {
            if (canvasSize < i * gameSize) {
                this.setScale(i - 1);
                break;
            }
        }

        this.offset[0] = Math.ceil((canvas.width - this.scale * size.getWidth()) / 2);
        this.offset[1] = Math.ceil((canvas.height - this.scale * size.getHeight()) / 2);
    }
}