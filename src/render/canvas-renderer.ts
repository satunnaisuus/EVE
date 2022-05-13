import { Game } from "../game/game";
import { StategyInterface } from "./strategy-interface";
import { DefaultStrategy } from "./strategy/default-strategy";
import { EnergyStrategy } from "./strategy/energy-strategy";
import { GenesisStrategy } from "./strategy/genesis-strategy";

export type RenderStrategy = 'default' | 'energy' | 'genesis';

export class CanvasRenderer {
    private context: CanvasRenderingContext2D;

    private renderStrategy: StategyInterface;

    private disabled: boolean;

    constructor(
        private canvas: HTMLCanvasElement,
        private game: Game,
        renderStrategy: RenderStrategy
    ) {
        this.context = canvas.getContext('2d');
        this.clear();
        this.setRenderStrategy(renderStrategy);
    }

    render() {
        if (! this.renderStrategy || this.disabled) {
            return;
        }

        this.clear();
        
        let width, height;

        const size = this.game.getGrid().getSize();
        const gameRatio = size.getRatio();
        const canvasRatio = this.canvas.width / this.canvas.height;
        
        let startPosition = [0, 0];

        if (gameRatio > canvasRatio) {
            width = this.canvas.width;
            height = this.canvas.width / gameRatio;
            startPosition[1] = (this.canvas.height - height) / 2;
        } else {
            width = this.canvas.height * gameRatio;
            height = this.canvas.height;
            startPosition[0] = (this.canvas.width - width) / 2;
        }

        const cellSize = width / this.game.getGrid().getSize().getWidth();

        for (const {x, y, cell} of this.game.getGrid()) {
            const cursorX = startPosition[0] + x * cellSize;
            const cursorY = startPosition[1] + y * cellSize;

            cell.visit(this.renderStrategy.createVisitor(cursorX, cursorY, cellSize));
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
}