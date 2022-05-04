import Game from "./game/game";
import createGame, { WALL_TYPE } from "./game/game-factory";
import CanvasRenderer, { RenderStrategy } from "./render/canvas-renderer";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const canvasContainer = document.getElementById("canvas-container");

function fitCanvas(canvas: HTMLCanvasElement, container: HTMLElement) {
    canvas.setAttribute("width", container.clientWidth.toString());
    canvas.setAttribute("height", container.clientHeight.toString());
}

fitCanvas(canvas, canvasContainer);

const game = createGame({
    walls: WALL_TYPE.AROUND,
});

const renderer = new CanvasRenderer(canvas, game, 'default');
renderer.render();

game.subscribe('step', (game: Game) => {
    renderer.render();
});

game.start();

window.addEventListener('resize', () => {
    fitCanvas(canvas, canvasContainer);
    renderer.render();
});

document.getElementById('map_theme').addEventListener('change', (e) => {
    renderer.setRenderStrategy(((e.target as HTMLSelectElement).value) as RenderStrategy);
});