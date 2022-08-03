import { PayloadData } from "../data";
import { CellType } from "./cells";

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
    cell: CellType;
}

export interface ResponseFindCellById {
    id: number;
    type: 'findCellById';
    cell: CellType;
}

export interface ResponseReplace {
    id: number;
    type: 'replace';
}

export type WorkerResponse =
    | ResponseStep
    | ResponseState
    | ResponseInit
    | ResponseSetParameter
    | ResponseGetOrganismsCount
    | ResponseGetCell
    | ResponseFindCellById
    | ResponseReplace;