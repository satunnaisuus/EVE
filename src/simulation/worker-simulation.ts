import { CellPayload, Simulation, SimulationEvent, StateEvent, StepEvent } from "./simulation";
import { SimulationOptions } from "./types/simulation-options";
import { WorkerResponse } from "./types/worker-commands";
import SimulationWorker from './simulation.worker.ts';

export class WorkerSimulation extends Simulation {
    private worker: SimulationWorker;
    
    private constructor(options: SimulationOptions) {
        super(options);
        this.worker = new SimulationWorker();

        this.worker.postMessage({type: 'init', options: options});

        this.worker.addEventListener('message', (ev: MessageEvent<WorkerResponse>) => {
            switch (ev.data.type) {
                case 'init':
                    return this.emit('init', new SimulationEvent());
                case 'start':
                    return this.emit('start', new SimulationEvent());
                case 'pause':
                    return this.emit('pause', new SimulationEvent());
                case 'step':
                    return this.emit('step', new StepEvent(ev.data.step));
                case 'state':
                    return this.emit('state', new StateEvent(ev.data.step, ev.data.buffer, ev.data.payload));
            }
        });
    }

    static async create(options: SimulationOptions): Promise<WorkerSimulation> {
        return new Promise((resolve) => {
            const simulation = new WorkerSimulation(options);
            simulation.addEventListener('init', () => resolve(simulation));
        });
    }

    start(): void {
        this.worker.postMessage({type: 'start'});
        this.emit('start', new SimulationEvent());
    }

    pause(): void {
        this.worker.postMessage({type: 'pause'});
        this.emit('pause', new SimulationEvent());
    }

    terminate(): void {
        this.worker.terminate();
        this.emit('terminate', new SimulationEvent());
    }

    step(): void {
        this.worker.postMessage({type: 'step'});
    }

    requestState(payload: CellPayload[]): void {
        this.worker.postMessage({type: 'requestState', payload: payload});
    }
}