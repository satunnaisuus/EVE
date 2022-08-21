import { OrganismCell } from "../../organism-cell";
import { AbstractInstruction } from "../abstract-instruction";

export class NothingInstruction extends AbstractInstruction {
    execute(organism: OrganismCell): boolean {
        organism.addProgramCounterRelative(1);
        
        return false;
    }

    hasArgument(): boolean {
        return false;
    }

    hasGoto(): boolean {
        return false;
    }
}