import { SimulationParameters } from "../simulation-parameters";
import { CellContext } from "./cell-context";

export abstract class AbstractCell {
    update(context: CellContext, parameters: SimulationParameters): void {
        
    }

    isStatic(): boolean {
        return true;
    }

    isEmpty(): boolean {
        return false;
    }

    getId(): number {
        return 0;
    }

    abstract getType(): string;

    abstract serialize(): any;
}