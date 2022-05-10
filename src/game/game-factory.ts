import Color from "../common/color";
import CellFactory from "./cell-factory";
import Game from "./game";
import Genome from "./genome";
import { LoopType } from "./grid";
import { Size } from "./size";

export type GameOptions = {
    width?: number,
    height?: number,
    loop?: LoopType,
}

export default function createGame(options?: GameOptions): Game {
    options = Object.assign({
        width: 200,
        height: 100,
        loop: 'none',
    }, options)

    const cellFactory = new CellFactory();
    const size = new Size(options.width, options.height);
    const game = new Game(size, options.loop, cellFactory);

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