import { CellContext } from "../../cell-context";
import { OrganismCell } from "../organism-cell";

export abstract class AbstractInstruction {
    abstract execute(organism: OrganismCell, context: CellContext, arg: number, goto: number): boolean;

    abstract hasArgument(): boolean;

    abstract hasGoto(): boolean;
}