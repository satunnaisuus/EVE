import CellFactory from "./game/cell-factory";
import Game from "./game/game";
import { Size } from "./game/size";
import CanvasRenderer from "./render/canvas-renderer";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const canvasContainer = document.getElementById("canvas-container");

function fitCanvas(canvas: HTMLCanvasElement, container: HTMLElement) {
    canvas.setAttribute("width", container.clientWidth.toString());
    canvas.setAttribute("height", container.clientHeight.toString());
}

fitCanvas(canvas, canvasContainer);

const cellFactory = new CellFactory();
const size = new Size(125, 70);
const game = new Game(size, cellFactory);

game.getGrid().insert(3, 5, cellFactory.createWall());
game.getGrid().insert(5, 5, cellFactory.createOrganism());

for (const {x, y} of game.getGrid()) {
    if (x === 0 || y === 0 || x === size.getWidth() - 1 || y === size.getHeight() - 1) {
        game.getGrid().insert(x, y, cellFactory.createWall());
    }
}

const renderer = new CanvasRenderer(canvas, game);
renderer.render();

const tickDelay = 50;

let timerId = setTimeout(function tick() {
    game.update();
    renderer.render();

    timerId = setTimeout(tick, tickDelay);
}, tickDelay);

window.addEventListener('resize', () => {
    fitCanvas(canvas, canvasContainer);
    renderer.render();
});