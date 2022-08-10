import { SimulationParameters } from "../simulation-parameters";
import { Cell } from "../types/cells";
import { CellContext } from "./cell-context";

export enum CellType {
    EMPTY,
    ORGANISM,
    ORGANIC,
    WALL,
}

export abstract class AbstractCell {
    abstract update(context: CellContext, parameters: SimulationParameters): void;

    isStatic(): boolean {
        return true;
    }

    isEmpty(): boolean {
        return false;
    }

    getId(): number {
        return 0;
    }

    abstract getType(): CellType;

    abstract serialize(): Cell;
}