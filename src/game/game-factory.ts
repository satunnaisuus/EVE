import Color from "../common/color";
import CellFactory from "./cell-factory";
import Game from "./game";
import Genome from "./genome";
import { Size } from "./size";

export enum WALL_TYPE {
    NONE = 'none',
    AROUND = 'around'
} 

export type GameOptions = {
    width?: number,
    height?: number,
    walls?: WALL_TYPE
}

export default function createGame(options?: GameOptions): Game {
    options = Object.assign({
        width: 200,
        height: 100,
        walls: WALL_TYPE.NONE,
    }, options)

    const cellFactory = new CellFactory();
    const size = new Size(options.width, options.height);
    const game = new Game(size, cellFactory);

    makeWalls(game, options.walls);
    spawnOrganisms(game);

    return game;
}

function spawnOrganisms(game: Game): void {
    const cellFactory = game.getCellFactory();

    for (const {x, y, cell} of game.getGrid()) {
        if (cell.isEmpty() && Math.random() < 0.01) {
            game.getGrid().insert(x, y, cellFactory.createOrganism(
                Color.random(),
                Genome.createRandom()
            ));
        }
    }
}

function makeWalls(game: Game, type: WALL_TYPE): void {
    const size = game.getGrid().getSize();

    if (type === WALL_TYPE.AROUND) {
        for (const {x, y} of game.getGrid()) {
            if (x === 0 || y === 0 || x === size.getWidth() - 1 || y === size.getHeight() - 1) {
                game.getGrid().insert(x, y, game.getCellFactory().createWall());
            }
        }
    }
}