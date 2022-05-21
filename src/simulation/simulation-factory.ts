import { shuffle } from "../common/array-utils";
import { Color } from "../common/color";
import { CellFactory } from "./cell/cell-factory";
import { Simulation } from "./simulation";
import { Genome } from "./cell/type/organism/genome";
import { GridSize } from "./grid-size";
import { GridLoopType } from "./grid-loop-type";
import { SimulationParams } from "./simulation-params";

export type SimulationOptions = {
    width?: number,
    height?: number,
    loop?: GridLoopType,
    initialEnergy?: number,
    population?: number,
}

export function createSimulation(options?: SimulationOptions, params?: SimulationParams): Simulation {
    options = Object.assign({
        width: 200,
        height: 100,
        loop: GridLoopType.NONE,
        population: 5,
        initialEnergy: 70,
    }, options);

    const cellFactory = new CellFactory();
    const size = new GridSize(options.width, options.height);
    const simulation = new Simulation(size, options.loop, params, cellFactory);
    const population = Math.ceil(size.getCellCount() * options.population / 100);

    spawnOrganisms(simulation, population, options.initialEnergy);

    return simulation;
}

function spawnOrganisms(simulation: Simulation, count: number, initialEnergy: number): void {
    const cellFactory = simulation.getCellFactory();

    const coordinates: [number, number][] = [];

    for (const {x, y, cell} of simulation.getGrid()) {
        if (cell.isEmpty()) {
            coordinates.push([x, y]);
        }
    }

    for (const [x, y] of shuffle(coordinates).slice(0, count)) {
        simulation.getGrid().insert(x, y, cellFactory.createOrganism(
            Color.random(),
            Genome.createRandom(),
            initialEnergy
        ));
    }
}