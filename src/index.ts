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

const renderer = new CanvasRenderer(canvas, game);

renderer.render();

window.addEventListener('resize', () => {
    fitCanvas(canvas, canvasContainer);
    renderer.render();
});