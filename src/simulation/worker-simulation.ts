import { Parameters, Dump, Simulation, StepData } from "./simulation";
import { SimulationOptions } from "./types/simulation-options";
import { WorkerResponse } from "./types/worker-response";
import SimulationWorker from './simulation.worker.ts';
import { Cell, CellType } from "./types/cells";
import { PayloadData } from "./data";
import { CreateOptions } from "./cell/cell-factory";
import { SimulationParameters } from "./types/simulation-parameters";

export class WorkerSimulation extends Simulation {
    private worker: SimulationWorker;

    private lastRequestId = 0;

    private messageListeners: {
        makeStep: {[key: number]: (step: number) => void},
        state: {[key: number]: (data: StepData) => void},
        setParameter: {[key: number]: (value: any) => void},
        getOrganismsCount: {[key: number]: (count: number) => void},
        getCell: {[key: number]: (cell: Cell) => void},
        findCellById: {[key: number]: (cell: Cell) => void},
        replace: {[key: number]: () => void},
        dump: {[key: number]: (dump: Dump) => void},
        getParameters: {[key: number]: (parameters: SimulationParameters) => void},
    } = {
        makeStep: {},
        state: {},
        setParameter: {},
        getOrganismsCount: {},
        getCell: {},
        findCellById: {},
        replace: {},
        dump: {},
        getParameters: {},
    };

    private constructor(onInit: (simulation: WorkerSimulation) => any, options?: SimulationOptions, dump?: Dump) {
        super(options || dump.options);

        this.worker = new SimulationWorker();

        this.worker.postMessage({type: 'init', options: options, dump: dump});
        
        this.worker.addEventListener('message', (ev: MessageEvent<WorkerResponse>) => {
            switch (ev.data.type) {
                case 'init':
                    return onInit(this);

                case 'makeStep':
                    this.messageListeners.makeStep[ev.data.id](ev.data.step);
                    delete this.messageListeners.makeStep[ev.data.id];
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
                
                case 'dump':
                    this.messageListeners.dump[ev.data.id](ev.data.dump);
                    delete this.messageListeners.dump[ev.data.id];
                    return;
            
                case 'getParameters':
                    this.messageListeners.getParameters[ev.data.id](ev.data.parameters);
                    delete this.messageListeners.getParameters[ev.data.id];
                    return;
            }
        });
    }

    static createFromDump(dump: Dump): Promise<WorkerSimulation> {
        return new Promise((resolve) => {
            new WorkerSimulation((simulation) => resolve(simulation), null, dump);
        });
    }

    static create(options: SimulationOptions): Promise<WorkerSimulation> {
        return new Promise((resolve) => {
            new WorkerSimulation((simulation) => resolve(simulation), options, null);
        });
    }

    terminate(): void {
        this.worker.terminate();
    }

    makeStep(): Promise<number> {
        return new Promise((resolve) => {
            const id = this.nextId();
            this.messageListeners.makeStep[id] = resolve;
            this.worker.postMessage({id: id, type: 'makeStep'});
        });
    }

    getState(payload: PayloadData): Promise<StepData> {
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

    findCellById(cellId: number): Promise<Cell> {
        return new Promise((resolve) => {
            const id = this.nextId();
            this.messageListeners.findCellById[id] = resolve;
            this.worker.postMessage({id: id, type: 'findCellById', cellId: cellId});
        });
    }

    getCell(x: number, y: number): Promise<Cell> {
        return new Promise((resolve) => {
            const id = this.nextId();
            this.messageListeners.getCell[id] = resolve;
            this.worker.postMessage({id: id, type: 'getCell', x: x, y: y});
        });
    }

    replace(coords: [number, number][], type: CellType, ignore: CellType[], options: CreateOptions): Promise<void> {
        return new Promise((resolve) => {
            const id = this.nextId();
            this.messageListeners.replace[id] = resolve;
            this.worker.postMessage({id: id, type: 'replace', coords: coords, cellType: type, ignore: ignore, options: options});
        });
    }

    dump(): Promise<Dump> {
        return new Promise((resolve) => {
            const id = this.nextId();
            this.messageListeners.dump[id] = resolve;
            this.worker.postMessage({id: id, type: 'dump'});
        });
    }

    getParameters(): Promise<SimulationParameters> {
        return new Promise((resolve) => {
            const id = this.nextId();
            this.messageListeners.getParameters[id] = resolve;
            this.worker.postMessage({id: id, type: 'getParameters'});
        });
    }

    private nextId(): number {
        return this.lastRequestId++;
    }
}