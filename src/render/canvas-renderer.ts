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

        const cellSize = (width - STYLES.CELL_BORDER_WIDTH) / this.game.getGrid().getSize().getWidth().getValue() - STYLES.CELL_BORDER_WIDTH;

        for (let x = 0; x < this.game.getGrid().getSize().getWidth().getValue(); x++) {
            for (let y = 0; y < this.game.getGrid().getSize().getHeight().getValue(); y++) {
                
            }
        }

        for (let x = 0; x < this.game.getGrid().getSize().getWidth().getValue(); x++) {
            this.context.fillStyle = STYLES.CELL_BORDER_COLOR;
            const cursorX = startPosition[0] + x * (cellSize + STYLES.CELL_BORDER_WIDTH);
            this.context.fillRect(cursorX, startPosition[1], STYLES.CELL_BORDER_WIDTH, height);            
        }

        for (let y = 0; y < this.game.getGrid().getSize().getHeight().getValue(); y++) {
            this.context.fillStyle = STYLES.CELL_BORDER_COLOR;
            const cursorY = startPosition[1] + y * (cellSize + STYLES.CELL_BORDER_WIDTH);
            this.context.fillRect(startPosition[0], cursorY, width, STYLES.CELL_BORDER_WIDTH);
        }

        this.context.fillStyle = STYLES.CELL_BORDER_COLOR;
        this.context.fillRect(startPosition[0] + width - STYLES.CELL_BORDER_WIDTH,  startPosition[1], STYLES.CELL_BORDER_WIDTH, height);
        this.context.fillRect(startPosition[0],  startPosition[1] + height - STYLES.CELL_BORDER_WIDTH, width, STYLES.CELL_BORDER_WIDTH);
    }

    public clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}