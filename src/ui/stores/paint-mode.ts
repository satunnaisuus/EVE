import { makeObservable, observable, action } from "mobx";
import { CanvasRenderer } from "./canvas-renderer";
import { SimulationStore } from "./simulation-store";

export type PaintingType = 'wall' | 'empty' | 'organic' | 'organism';
export type BrushType = 'square' | 'circle';

const HISTORY_CLEAR_TIMEOUT = 1000;

export class PaintMode {
    @observable
    private enabled: boolean = false;

    @observable
    private type: PaintingType = 'organic';

    @observable
    private brush: BrushType = 'square';

    @observable
    private size: number = 2;

    private lastPainted: {[key: string]: number} = {};

    constructor(
        private simulation: SimulationStore,
        private canvasRenderer: CanvasRenderer
    ) {
        makeObservable(this);
    }

    isEnabled(): boolean {
        return this.enabled;
    }

    @action
    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    getType(): PaintingType {
        return this.type;
    }

    @action
    setType(type: PaintingType): void {
        this.type = type;
    }

    getBrush(): BrushType {
        return this.brush;
    }

    @action
    setBrush(brush: BrushType): void {
        this.brush = brush;
    }

    getSize(): number {
        return this.size;
    }

    @action
    setSize(size: number): void {
        this.size = size;
    }

    paint(centerX: number, centerY: number): void {
        this.clearPaintHistory();

        const width = this.simulation.getOptions().width;
        const height = this.simulation.getOptions().height;

        const size = this.getSize() - 1;

        let cells: [number, number][] = [];

        const now = +Date.now();

        const putPixel = (cellX: number, cellY: number) => {
            if (cellX < 0 || cellY < 0 || cellX >= width || cellY >= height) {
                return;
            }

            const key = cellX + ':' + cellY;

            if (! this.lastPainted[key]) {
                cells.push([cellX, cellY]);
            }
            
            this.lastPainted[key] = now;
        }
        
        if (this.getBrush() === 'square') {
            for (let xi = 0; xi < 1 + size * 2; xi++) {
                for (let yi = 0; yi < 1 + size * 2; yi++) {
                    putPixel(centerX - size + xi, centerY - size + yi);
                }
            }
        } else if (this.getBrush() === 'circle') {
            let IG = size * 2 - 3;
            let IDGR = -6;
            let IDGD = size * 4 - 10;
            
            let IX = 0;
            let IY = size;
            
            while (IY >= IX) {
                for (let n = size - IX; n <= size + IX; n++) {
                    putPixel(n + centerX - size, centerY + IY);
                    putPixel(n + centerX - size, centerY - IY);
                }

                for (let n = size - IY; n <= size + IY; n++) {
                    putPixel(n + centerX - size, centerY + IX);
                    putPixel(n + centerX - size, centerY - IX);
                }

                if (IG < 0) {
                    IG = IG + IDGD
                    IDGD -= 8
                    IY -= 1
                } else {
                    IG += IDGR
                    IDGD -= 4
                }

                IDGR -= 4
                IX += 1
            }
        }

        if (cells.length === 0) {
            return;
        }

        this.simulation.replace(cells, this.getType()).then(() => {
            this.canvasRenderer.update();
        });
    }

    private clearPaintHistory(): void {
        const now = +Date.now();

        for (const key in this.lastPainted) {
            if (this.lastPainted[key] + HISTORY_CLEAR_TIMEOUT < now) {
                delete this.lastPainted[key];
            }
        }
    }
}