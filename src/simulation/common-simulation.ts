import { shuffle } from "../common/array-utils";
import { Color } from "../common/color";
import { CellFactory } from "./cell/cell-factory";
import { Genome } from "./cell/type/organism/genome";
import { Data } from "./data";
import { CellPayload, Simulation, SimulationEvent, StepEvent } from "./simulation";
import { SimulationParams } from "./simulation-params";
import { State } from "./state";
import { SimulationOptions } from "./types/simulation-options";

const TIMEOUT_DELAY = 5;

function spawnOrganisms(simulation: State, cellFactory: CellFactory, count: number, initialEnergy: number): void {
    const coordinates: [number, number][] = [];
    const cells = simulation.getGrid().toArray();

    for (let x = 0; x < cells.length; x++) {
        for (let y = 0; y < cells[x].length; y++) {
            const cell = cells[x][y];

            if (cell.isEmpty()) {
                coordinates.push([x, y]);
            }
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

export class CommonSimulation extends Simulation {
    private state: State;

    private timeoutId: ReturnType<typeof setTimeout>;
    
    constructor(options: SimulationOptions) {
        super(options);
        options = this.options;
        
        const cellFactory = new CellFactory();
        this.state = new State(options.width, options.height, options.loop, new SimulationParams(), cellFactory);
        const population = Math.ceil(options.width * options.height * options.population / 100);
    
        spawnOrganisms(this.state, cellFactory, population, options.initialEnergy);
    }

    start(): void {
        if (this.timeoutId) {
            return;
        }

        const tick = () => {
            this.step();
            this.timeoutId = setTimeout(tick, TIMEOUT_DELAY);
        }

        this.timeoutId = setTimeout(tick, TIMEOUT_DELAY);

        this.emit('start', new SimulationEvent());
    }

    pause(): void {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
            this.emit('pause', new SimulationEvent());
        }
    }

    terminate(): void {
        clearTimeout(this.timeoutId);
        this.emit('terminate', new SimulationEvent());
    }

    step(): void {
        this.state.next();
        this.emit('step', new StepEvent(this.state.getStep()));
    }

    requestState(payload: CellPayload[]): void {
        const data = Data.create(this.state, payload);

        this.emit('state', {
            step: this.state.getStep(),
            buffer: data.getArray().buffer,
            payload: payload,
        });
    }
}