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

export interface CommandGetCell {
    id: number;
    type: 'getCell';
    x: number;
    y: number;
}

export interface CommandFindCellById {
    id: number;
    type: 'findCellById';
    cellId: number;
}

export interface CommandReplace {
    id: number;
    type: 'replce';
    coords: [number, number][],
    cellType: string;
    ignore: string[];
}

export type WorkerCommand =
    | CommandInit
    | CommandStep
    | CommandRequestState
    | CommandSetParameter
    | CommandGetOrganismsCount
    | CommandGetCell
    | CommandFindCellById
    | CommandReplace;