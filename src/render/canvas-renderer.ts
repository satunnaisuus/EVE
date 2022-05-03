import { Direction } from "../game/direction";
import { EmptyCell } from "../game/empty-cell";
import Game from "../game/game";
import { MeatCell } from "../game/meat-cell";
import { OrganismCell } from "../game/organism-cell";
import { PlantCell } from "../game/plant-cell";
import { WallCell } from "../game/wall";

const STYLES = {
    CELL_WALL_COLOR: '#5f5f5f',
    CELL_ORGANISM_COLOR: '#0B5FA5',
    CELL_ORGANISM_EYE_COLOR: '#66A1D2',
    CELL_EMPTY_COLOR: '#000000',
    CELL_PLANT_COLOR: '#399200',
    CELL_MEAT_COLOR: '#FE7276',
};

export default class CanvasRenderer {
    private context: CanvasRenderingContext2D;

    constructor(private canvas: HTMLCanvasElement, private game: Game) {
        this.context = canvas.getContext('2d');
    }

    public render() {
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
            cell.visit({
                visitEmpty: (cell: EmptyCell) => {
                    this.context.fillStyle = STYLES.CELL_EMPTY_COLOR;
                    const cursorX = startPosition[0] + x * cellSize;
                    const cursorY = startPosition[1] + y * cellSize;
                    this.context.fillRect(cursorX, cursorY, cellSize, cellSize);
                },
                visitWall: (cell: WallCell) => {
                    this.context.fillStyle = STYLES.CELL_WALL_COLOR;
                    const cursorX = startPosition[0] + x * cellSize;
                    const cursorY = startPosition[1] + y * cellSize;
                    this.context.fillRect(cursorX, cursorY, cellSize, cellSize);
                },
                visitPlant: (cell: PlantCell) => {
                    this.context.fillStyle = STYLES.CELL_PLANT_COLOR;
                    const cursorX = startPosition[0] + x * cellSize;
                    const cursorY = startPosition[1] + y * cellSize;
                    this.context.fillRect(cursorX, cursorY, cellSize, cellSize);
                },
                visitMeat: (cell: MeatCell) => {
                    this.context.fillStyle = STYLES.CELL_MEAT_COLOR;
                    const cursorX = startPosition[0] + x * cellSize;
                    const cursorY = startPosition[1] + y * cellSize;
                    this.context.fillRect(cursorX, cursorY, cellSize, cellSize);
                },
                visitOrganism: (cell: OrganismCell) => {
                    this.context.fillStyle = STYLES.CELL_ORGANISM_COLOR;
                    const cursorX = startPosition[0] + x * cellSize;
                    const cursorY = startPosition[1] + y * cellSize;
                    this.context.fillRect(cursorX, cursorY, cellSize, cellSize);

                    const eyeSize = cellSize / 3;

                    let eyeOffset;

                    switch (cell.getDirection()) {
                        case Direction.NORTH_WEST:
                            eyeOffset = [0, 0];
                            break;
                        case Direction.NORTH:
                            eyeOffset = [eyeSize, 0];
                            break;
                        case Direction.NORTH_EAST:
                            eyeOffset = [eyeSize * 2, 0];
                            break;
                        case Direction.SOUTH_WEST:
                            eyeOffset = [0, eyeSize * 2];
                            break;
                        case Direction.SOUTH:
                            eyeOffset = [eyeSize, eyeSize * 2];
                            break;
                        case Direction.SOUTH_EAST:
                            eyeOffset = [eyeSize * 2, eyeSize * 2];
                            break;
                        case Direction.WEST:
                            eyeOffset = [0, eyeSize];
                            break;
                        case Direction.EAST:
                            eyeOffset = [eyeSize * 2, eyeSize];
                            break;
                    }

                    this.context.fillStyle = STYLES.CELL_ORGANISM_EYE_COLOR;
                    this.context.fillRect(cursorX + eyeOffset[0], cursorY + eyeOffset[1], eyeSize, eyeSize);
                }
            });
        }
    }
}