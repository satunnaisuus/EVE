import { shuffle } from "../common/array-utils";
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
    population?: number,
}

export default function createGame(options?: GameOptions): Game {
    options = Object.assign({
        width: 200,
        height: 100,
        loop: 'none',
        population: 5,
    }, options)

    const cellFactory = new CellFactory();
    const size = new Size(options.width, options.height);
    const game = new Game(size, options.loop, cellFactory);
    const population = Math.floor(size.getCellCount() * options.population / 100);

    spawnOrganisms(game, population);

    return game;
}

function spawnOrganisms(game: Game, count: number): void {
    const cellFactory = game.getCellFactory();

    const coordinates: [number, number][] = [];

    for (const {x, y, cell} of game.getGrid()) {
        if (cell.isEmpty()) {
            coordinates.push([x, y]);
        }
    }

    for (const [x, y] of shuffle(coordinates).slice(0, count)) {
        game.getGrid().insert(x, y, cellFactory.createOrganism(
            Color.random(),
            Genome.createRandom()
        ));
    }
}