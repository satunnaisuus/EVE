import { shuffle } from "../common/array-utils";
import Color from "../common/color";
import CellFactory from "./cell-factory";
import Game, { GameParams } from "./game";
import Genome from "./genome";
import { LoopType } from "./grid";
import { Size } from "./size";

export type GameOptions = {
    width?: number,
    height?: number,
    loop?: LoopType,
    population?: number,
    params?: GameParams,
}

export default function createGame(options?: GameOptions): Game {
    options = Object.assign({
        width: 200,
        height: 100,
        loop: 'none',
        population: 5,
    }, options);

    options.params = Object.assign({
        plantSpawnRate: 10,
    }, options.params);

    const cellFactory = new CellFactory();
    const size = new Size(options.width, options.height);
    const game = new Game(size, options.loop, options.params, cellFactory);
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