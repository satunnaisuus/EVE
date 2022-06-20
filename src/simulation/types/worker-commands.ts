import { CellPayload, Parameters } from "../simulation";
import { SimulationOptions } from "./simulation-options";

export interface CommandInit {
    type: 'init';
    options: SimulationOptions;
}

export interface CommandStep {
    id: number;
    type: 'step';
}

export interface CommandRequestState {
    id: number;
    type: 'requestState';
    payload: CellPayload;
}

export interface CommandSetParameter {
    id: number;
    type: 'setParameter';
    parameter: Parameters,
    value: any;
}

export interface CommandGetOrganismsCount {
    id: number;
    type: 'getOrganismsCount';
}

export type WorkerCommand =
    | CommandInit
    | CommandStep
    | CommandRequestState
    | CommandSetParameter
    | CommandGetOrganismsCount;

export interface ResponseInit {
    type: 'init';
}

export interface ResponseStep {
    id: number;
    type: 'step';
    step: number;
}

export interface ResponseState {
    id: number;
    type: 'state';
    step: number;
    payload: CellPayload;
    buffer: ArrayBufferLike;
}

export interface ResponseSetParameter {
    id: number;
    type: 'setParameter';
    value: any;
}

export interface ResponseGetOrganismsCount {
    id: number;
    type: 'getOrganismsCount';
    count: number;
}

export type WorkerResponse =
    | ResponseStep
    | ResponseState
    | ResponseInit
    | ResponseSetParameter
    | ResponseGetOrganismsCount;