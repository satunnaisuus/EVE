import Game from "./game/game";
import { Organism } from "./game/organism";
import { Size } from "./game/size";
import { WallCell } from "./game/wall";
import CanvasRenderer from "./render/canvas-renderer";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const canvasContainer = document.getElementById("canvas-container");

function fitCanvas(canvas: HTMLCanvasElement, container: HTMLElement) {
    canvas.setAttribute("width", container.clientWidth.toString());
    canvas.setAttribute("height", container.clientHeight.toString());
}

fitCanvas(canvas, canvasContainer);

const size = new Size(125, 70);
const game = new Game(size);

game.getGrid().insert(3, 5, new WallCell());
game.getGrid().insert(5, 5, new Organism());

for (let x = 0; x < size.getWidth(); x++) {
    for (let y = 0; y < size.getHeight(); y++) {
        if (x === 0 || y === 0 || x === size.getWidth() - 1 || y === size.getHeight() - 1) {
            game.getGrid().insert(x, y, new WallCell());
        }
    }
}

const renderer = new CanvasRenderer(canvas, game);

renderer.render();

window.addEventListener('resize', () => {
    fitCanvas(canvas, canvasContainer);
    renderer.render();
});