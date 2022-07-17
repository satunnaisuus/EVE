import { CellPayload, Parameters, Simulation, StepData } from "./simulation";
import { SimulationOptions } from "./types/simulation-options";
import { WorkerResponse } from "./types/worker-response";
import SimulationWorker from './simulation.worker.ts';
import { CellType } from "./types/cells";

export class WorkerSimulation extends Simulation {
    private worker: SimulationWorker;

    private lastRequestId = 0;

    private messageListeners: {
        step: {[key: number]: (step: number) => void},
        state: {[key: number]: (data: StepData) => void},
        setParameter: {[key: number]: (value: any) => void},
        getOrganismsCount: {[key: number]: (count: number) => void},
        getCell: {[key: number]: (cell: CellType) => void},
        findCellById: {[key: number]: (cell: CellType) => void},
        replace: {[key: number]: () => void},
    } = {
        step: {},
        state: {},
        setParameter: {},
        getOrganismsCount: {},
        getCell: {},
        findCellById: {},
        replace: {},
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

                case 'setParameter':
                    this.messageListeners.setParameter[ev.data.id](ev.data.value);
                    delete this.messageListeners.setParameter[ev.data.id];
                    return;

                case 'getOrganismsCount':
                    this.messageListeners.getOrganismsCount[ev.data.id](ev.data.count);
                    delete this.messageListeners.getOrganismsCount[ev.data.id];
                    return;
                
                case 'getCell':
                    this.messageListeners.getCell[ev.data.id](ev.data.cell);
                    delete this.messageListeners.getCell[ev.data.id];
                    return;
                
                case 'findCellById':
                    this.messageListeners.findCellById[ev.data.id](ev.data.cell);
                    delete this.messageListeners.findCellById[ev.data.id];
                    return;
                
                case 'replace':
                    this.messageListeners.replace[ev.data.id]();
                    delete this.messageListeners.replace[ev.data.id];
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
            const id = this.nextId();
            this.messageListeners.step[id] = resolve;
            this.worker.postMessage({id: id, type: 'step'});
        });
    }

    getState(payload: CellPayload): Promise<StepData> {
        return new Promise((resolve) => {
            const id = this.nextId();
            this.messageListeners.state[id] = resolve;
            this.worker.postMessage({id: id, type: 'requestState', payload: payload});
        });
    }

    setParameter<T>(parameter: Parameters, value: T): Promise<T> {
        return new Promise((resolve) => {
            const id = this.nextId();
            this.messageListeners.setParameter[id] = resolve;
            this.worker.postMessage({id: id, type: 'setParameter', parameter: parameter, value: value});
        });
    }

    getOrganismsCount(): Promise<number> {
        return new Promise((resolve) => {
            const id = this.nextId();
            this.messageListeners.getOrganismsCount[id] = resolve;
            this.worker.postMessage({id: id, type: 'getOrganismsCount'});
        });
    }

    findCellById(cellId: number): Promise<CellType> {
        return new Promise((resolve) => {
            const id = this.nextId();
            this.messageListeners.findCellById[id] = resolve;
            this.worker.postMessage({id: id, type: 'findCellById', cellId: cellId});
        });
    }

    getCell(x: number, y: number): Promise<CellType> {
        return new Promise((resolve) => {
            const id = this.nextId();
            this.messageListeners.getCell[id] = resolve;
            this.worker.postMessage({id: id, type: 'getCell', x: x, y: y});
        });
    }

    replace(coords: [number, number][], type: string, ignore: string[]): Promise<void> {
        return new Promise((resolve) => {
            const id = this.nextId();
            this.messageListeners.replace[id] = resolve;
            this.worker.postMessage({id: id, type: 'replace', coords: coords, cellType: type, ignore: ignore});
        });
    }

    private nextId(): number {
        return this.lastRequestId++;
    }
}