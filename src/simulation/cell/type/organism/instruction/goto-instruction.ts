import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractInstruction } from "../abstract-instruction";

export class GotoInstruction extends AbstractInstruction {
    execute(organism: OrganismCell, context: CellContext, arg: number, goto: number): boolean {
        organism.setProgramCounter(goto);
        
        return false;
    }

    hasArgument(): boolean {
        return false
    }

    hasGoto(): boolean {
        return true;
    }
}