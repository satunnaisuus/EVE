import Game from "../game/game";

const STYLES = {
    CELL_BORDER_WIDTH: 1,
    CELL_BORDER_COLOR: '#ffffff',
    CELL_WALL_COLOR: '#0000ff',
    CELL_ORGANISM_COLOR: '#00ff00',
    CELL_EMPTY_COLOR: '#000000',
};

export default class CanvasRenderer {
    private context: CanvasRenderingContext2D;

    constructor(private canvas: HTMLCanvasElement, private game: Game) {
        this.context = canvas.getContext('2d');
    }

    public render() {
        this.clear();

        let width, height;

        const size = this.game.getGrid().getSize();

        const gameRatio = size.getRatio();
        const canvasRatio = this.canvas.width / this.canvas.height;

        let cellSize;
        let startPosition = [0, 0];

        if (gameRatio > canvasRatio) {
            width = this.canvas.width;
            height = Math.floor(this.canvas.width / gameRatio);
            cellSize = Math.floor(
                (width - STYLES.CELL_BORDER_WIDTH) / this.game.getGrid().getSize().getWidth().getValue() - STYLES.CELL_BORDER_WIDTH
            );
            startPosition[1] = Math.floor((this.canvas.height - height) / 2);
        } else {
            width = Math.floor(this.canvas.height * gameRatio);
            height = this.canvas.height;
            cellSize = 
                (height - STYLES.CELL_BORDER_WIDTH * (this.game.getGrid().getSize().getHeight().getValue() + 1)) / this.game.getGrid().getSize().getHeight().getValue()
            ;
            startPosition[0] = Math.floor((this.canvas.width - width) / 2);
        }

        for (let x = 0; x < this.game.getGrid().getSize().getWidth().getValue(); x++) {
            for (let y = 0; y < this.game.getGrid().getSize().getHeight().getValue(); y++) {
                const cursorX = startPosition[0] + x * (cellSize + STYLES.CELL_BORDER_WIDTH);
                const cursorY = startPosition[1] + y * (cellSize + STYLES.CELL_BORDER_WIDTH);
                
                this.context.lineWidth = STYLES.CELL_BORDER_WIDTH;
                this.context.strokeStyle = STYLES.CELL_BORDER_COLOR;
                this.context.beginPath();
                this.context.moveTo(cursorX + cellSize, cursorY);
                this.context.lineTo(cursorX, cursorY);
                this.context.lineTo(cursorX, cursorY + cellSize);
                this.context.stroke();
            }
        }

        this.context.lineWidth = STYLES.CELL_BORDER_WIDTH;
        this.context.strokeStyle = STYLES.CELL_BORDER_COLOR;
        this.context.beginPath();
        this.context.moveTo(startPosition[0] + width - STYLES.CELL_BORDER_WIDTH, startPosition[1]);
        this.context.lineTo(startPosition[0] + width - STYLES.CELL_BORDER_WIDTH, startPosition[1] + height - STYLES.CELL_BORDER_WIDTH);
        this.context.lineTo(startPosition[0], startPosition[1] + height - STYLES.CELL_BORDER_WIDTH);
        this.context.stroke();
    }

    public clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}