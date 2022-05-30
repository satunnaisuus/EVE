import { CellPayload } from "../simulation";
import { SimulationOptions } from "./simulation-options";

export interface CommandInit {
    type: 'init';
    options: SimulationOptions;
}

export interface CommandStart {
    type: 'start';
}

export interface CommandPause {
    type: 'pause';
}

export interface CommandStep {
    type: 'step';
}

export interface CommandRequestState {
    type: 'requestState';
    payload: CellPayload[];
}

export type WorkerCommand =
    | CommandInit
    | CommandStart
    | CommandPause
    | CommandStep
    | CommandRequestState;

export interface ResponseStart {
    type: 'start';
}

export interface ResponseInit {
    type: 'init';
}

export interface ResponsePause {
    type: 'pause';
}

export interface ResponseStep {
    type: 'step';
    step: number,
}

export interface ResponseState {
    type: 'state';
    step: number,
    payload: CellPayload[],
    buffer: ArrayBufferLike,
}

export type WorkerResponse =
    | ResponseStart
    | ResponsePause
    | ResponseStep
    | ResponseState
    | ResponseInit;