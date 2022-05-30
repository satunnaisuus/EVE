import { shuffle } from "../common/array-utils";
import { Color } from "../common/color";
import { CellFactory } from "./cell/cell-factory";
import { Genome } from "./cell/type/organism/genome";
import { Data } from "./data";
import { CellPayload, Simulation, StepData } from "./simulation";
import { SimulationParams } from "./simulation-params";
import { State } from "./state";
import { SimulationOptions } from "./types/simulation-options";

export class CommonSimulation extends Simulation {
    private state: State;

    private cellFactory: CellFactory;
    
    constructor(options: SimulationOptions) {
        super(options);
        options = this.options;
        
        this.cellFactory = new CellFactory();
        this.state = new State(options.width, options.height, options.loop, new SimulationParams(), this.cellFactory);
        const population = Math.ceil(options.width * options.height * options.population / 100);
    
        this.spawnOrganisms(population, options.initialEnergy);
    }

    step(): Promise<number> {
        return new Promise((resolve) => {
            this.state.next();
            resolve(this.state.getStep());
        });
    }

    getState(payload: CellPayload[]): Promise<StepData> {
        return new Promise((resolve) => {
            const data = Data.create(this.state, payload);

            resolve({
                step: this.state.getStep(),
                buffer: data.getArray().buffer,
                payload: payload,
            });
        });
    }

    private spawnOrganisms(count: number, initialEnergy: number): void {
        const coordinates: [number, number][] = [];
        const cells = this.state.getGrid().toArray();
    
        for (let x = 0; x < cells.length; x++) {
            for (let y = 0; y < cells[x].length; y++) {
                const cell = cells[x][y];
    
                if (cell.isEmpty()) {
                    coordinates.push([x, y]);
                }
            }
        }
    
        for (const [x, y] of shuffle(coordinates).slice(0, count)) {
            this.state.getGrid().insert(x, y, this.cellFactory.createOrganism(
                Color.random(),
                Genome.createRandom(),
                initialEnergy
            ));
        }
    }
}