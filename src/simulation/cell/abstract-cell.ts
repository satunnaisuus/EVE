import { SimulationParameters } from "../simulation-parameters";
import { CellContext } from "./cell-context";
import { CellVisitor } from "./cell-visitor";

export abstract class AbstractCell {
    abstract visit(visitor: CellVisitor): void;

    update(context: CellContext, parameters: SimulationParameters): void {
        
    }

    isStatic(): boolean {
        return true;
    }

    isEmpty(): boolean {
        return false;
    }

    abstract getType(): string;

    abstract serialize(): any;
}