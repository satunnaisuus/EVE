import { CreateOptions } from "../cell/cell-factory";
import { PayloadData } from "../data";
import { Parameters, Dump } from "../simulation";
import { CellType } from "./cells";
import { SimulationOptions } from "./simulation-options";

export interface CommandInit {
    type: 'init';
    options?: SimulationOptions;
    dump?: Dump;
}

export interface CommandMakeStep {
    id: number;
    type: 'makeStep';
}

export interface CommandRequestState {
    id: number;
    type: 'requestState';
    payload: PayloadData;
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
    cellType: CellType;
    ignore: CellType[];
    options: CreateOptions;
}

export interface CommandDump {
    id: number;
    type: 'dump';
}

export interface CommandGetParameters {
    id: number;
    type: 'getParameters';
}

export type WorkerCommand =
    | CommandInit
    | CommandMakeStep
    | CommandRequestState
    | CommandSetParameter
    | CommandGetOrganismsCount
    | CommandGetCell
    | CommandFindCellById
    | CommandReplace
    | CommandDump
    | CommandGetParameters;