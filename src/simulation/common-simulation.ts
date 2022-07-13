import { shuffle } from "../common/array-utils";
import { CellFactory } from "./cell/cell-factory";
import { Genome } from "./cell/type/organism/genome";
import { Data } from "./data";
import { CellPayload, Parameters, Simulation, StepData } from "./simulation";
import { SimulationParameters } from "./simulation-parameters";
import { State } from "./state";
import { CellType } from "./types/cells";
import { SimulationOptions } from "./types/simulation-options";

export class CommonSimulation extends Simulation {
    private state: State;

    private cellFactory: CellFactory;
    
    constructor(options: SimulationOptions) {
        super(options);
        options = this.options;
        
        this.cellFactory = new CellFactory();
        this.state = new State(options.width, options.height, options.loop, new SimulationParameters(), this.cellFactory);
        const population = Math.ceil(options.width * options.height * options.population / 100);
    
        this.spawnOrganisms(population, options.initialEnergy);
    }

    step(): Promise<number> {
        return new Promise((resolve) => {
            this.state.next();
            resolve(this.state.getStep());
        });
    }

    getState(payload: CellPayload): Promise<StepData> {
        return new Promise((resolve) => {
            const data = Data.create(this.state, payload);

            resolve({
                step: this.state.getStep(),
                buffer: data.getArray().buffer,
                payload: payload,
            });
        });
    }

    async setParameter<T>(parameter: Parameters, value: T): Promise<T> {
        this.state.getParameters()[parameter] = value as any;
        return this.state.getParameters()[parameter] as any;
    }

    async getOrganismsCount(): Promise<number> {
        return this.state.getOrganismsCount();
    }

    async findCellById(id: number): Promise<CellType> {
        const cell = this.state.getGrid().find(id);

        if (cell) {
            return cell.serialize();
        }

        return null;
    }

    async getCell(x: number, y: number): Promise<CellType> {
        return this.state.getGrid().getCell(x, y).serialize();
    }

    async replace(coords: [number, number][], type: string): Promise<void> {
        this.state.replace(coords, type);
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
                Genome.createRandom(),
                initialEnergy
            ));
        }
    }
}