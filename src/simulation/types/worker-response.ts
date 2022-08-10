import { PayloadData } from "../data";
import { Dump } from "../simulation";
import { SimulationParameters } from "../simulation-parameters";
import { Cell } from "./cells";

export interface ResponseInit {
    type: 'init';
}

export interface ResponseMakeStep {
    id: number;
    type: 'makeStep';
    step: number;
}

export interface ResponseState {
    id: number;
    type: 'state';
    step: number;
    payload: PayloadData;
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

export interface ResponseGetCell {
    id: number;
    type: 'getCell';
    cell: Cell;
}

export interface ResponseFindCellById {
    id: number;
    type: 'findCellById';
    cell: Cell;
}

export interface ResponseReplace {
    id: number;
    type: 'replace';
}

export interface ResponseDump {
    id: number;
    type: 'dump';
    dump: Dump;
}

export interface ResponseGetParameters {
    id: number;
    type: 'getParameters';
    parameters: SimulationParameters;
}

export type WorkerResponse =
    | ResponseMakeStep
    | ResponseState
    | ResponseInit
    | ResponseSetParameter
    | ResponseGetOrganismsCount
    | ResponseGetCell
    | ResponseFindCellById
    | ResponseReplace
    | ResponseDump
    | ResponseGetParameters;