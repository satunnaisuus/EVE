import { CellPayload, Simulation, StepData } from "./simulation";
import { SimulationOptions } from "./types/simulation-options";
import { WorkerResponse } from "./types/worker-commands";
import SimulationWorker from './simulation.worker.ts';

export class WorkerSimulation extends Simulation {
    private worker: SimulationWorker;

    private lastRequestId = 0;

    private messageListeners: {
        step: {[key: number]: (step: number) => void},
        state: {[key: number]: (data: StepData) => void},
    } = {
        step: {},
        state: {},
    };

    private constructor(options: SimulationOptions, onInit: (simulation: WorkerSimulation) => any) {
        super(options);

        this.worker = new SimulationWorker();
        this.worker.postMessage({type: 'init', options: options});
        this.worker.addEventListener('message', (ev: MessageEvent<WorkerResponse>) => {
            switch (ev.data.type) {
                case 'init':
                    return onInit(this);

                case 'step':
                    this.messageListeners.step[ev.data.id](ev.data.step);
                    delete this.messageListeners.step[ev.data.id];
                    return;

                case 'state':
                    this.messageListeners.state[ev.data.id](
                        new StepData(ev.data.step, ev.data.buffer, ev.data.payload)
                    );
                    delete this.messageListeners.state[ev.data.id];
                    return;
            }
        });
    }

    static create(options: SimulationOptions): Promise<WorkerSimulation> {
        return new Promise((resolve) => {
            new WorkerSimulation(options, (simulation) => resolve(simulation));
        });
    }

    terminate(): void {
        this.worker.terminate();
    }

    step(): Promise<number> {
        return new Promise((resolve) => {
            const id = this.lastRequestId++;
            this.messageListeners.step[id] = resolve;
            this.worker.postMessage({id: id, type: 'step'});
        });
    }

    getState(payload: CellPayload[]): Promise<StepData> {
        return new Promise((resolve) => {
            const id = this.lastRequestId++;
            this.messageListeners.state[id] = resolve;
            this.worker.postMessage({id: id, type: 'requestState', payload: payload});
        });
    }
}