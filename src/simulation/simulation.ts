import { CellType } from "./types/cells";
import { GridLoopType } from "./types/grid-loop-type";
import { SimulationOptions } from "./types/simulation-options";

export interface SimulationState {
    step: number;
    id: string;
    grid: CellType[][];
}

export class SimulationEvent {
    constructor() {
        
    }
}

export class StepEvent extends SimulationEvent {
    constructor(
        public readonly step: number
    ) {
        super();
    }
}

export class StateEvent extends SimulationEvent {
    constructor(
        public readonly step: number,
        public readonly buffer: ArrayBufferLike,
        public readonly payload: CellPayload[],
    ) {
        super();
    }
}

export interface SimulationEventMap {
    init: SimulationEvent,
    pause: SimulationEvent,
    terminate: SimulationEvent,
    start: SimulationEvent,
    step: StepEvent,
    state: StateEvent
};

export type CellPayload = 'energy' | 'lifetime' | 'direction';

export abstract class Simulation {
    protected options: SimulationOptions;

    private eventListeners: {[key: string]: ((ev: SimulationEvent) => any)[]} = {};

    abstract start(): void;

    abstract pause(): void;

    abstract terminate(): void;

    abstract requestState(payload: CellPayload[]): void;

    abstract step(): void;

    constructor(options: SimulationOptions) {
        this.options = Object.assign({
            width: 200,
            height: 100,
            loop: GridLoopType.NONE,
            population: 5,
            initialEnergy: 70,
        }, options);
    }

    getOptions(): SimulationOptions {
        return this.options;
    }

    addEventListener<K extends keyof SimulationEventMap>(type: K, listener: (ev: SimulationEventMap[K]) => any): () => void {
        if (! this.eventListeners[type]) {
            this.eventListeners[type] = [];
        }

        this.eventListeners[type].push(listener);

        return () => this.removeEventListener(type, listener);
    }

    removeEventListener<K extends keyof SimulationEventMap>(type: K, listener: (ev: SimulationEventMap[K]) => any): void {
        if (! this.eventListeners[type]) {
            return;
        }

        const index = this.eventListeners[type].findIndex((value) => value === listener);

        if (index === -1) {
            return;
        }

        this.eventListeners[type] = this.eventListeners[type].splice(index, 1);
    }

    protected emit<K extends keyof SimulationEventMap>(type: K, event: SimulationEventMap[K]) {
        const listeners = this.eventListeners[type];
        
        if (listeners) {
            for (const listener of listeners) {
                listener(event);
            }
        }
    }
}