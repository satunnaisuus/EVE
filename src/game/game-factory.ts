import { shuffle } from "../common/array-utils";
import { Color } from "../common/color";
import { CellFactory } from "./cell/cell-factory";
import { Game } from "./game";
import { Genome } from "./cell/type/organism/genome";
import { GridSize } from "./grid-size";
import { GridLoopType } from "./grid-loop-type";
import { GameParams } from "./game-params";

export type GameOptions = {
    width?: number,
    height?: number,
    loop?: GridLoopType,
    initialEnergy?: number,
    population?: number,
}

export function createGame(options?: GameOptions, params?: GameParams): Game {
    options = Object.assign({
        width: 200,
        height: 100,
        loop: GridLoopType.NONE,
        population: 5,
        initialEnergy: 70,
    }, options);

    const cellFactory = new CellFactory();
    const size = new GridSize(options.width, options.height);
    const game = new Game(size, options.loop, params, cellFactory);
    const population = Math.ceil(size.getCellCount() * options.population / 100);

    spawnOrganisms(game, population, options.initialEnergy);

    return game;
}

function spawnOrganisms(game: Game, count: number, initialEnergy: number): void {
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
            Genome.createRandom(),
            initialEnergy
        ));
    }
}