import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractInstruction } from "../abstract-instruction";

export class DivideInstruction extends AbstractInstruction {
    execute(organism: OrganismCell, context: CellContext): boolean {
        organism.divide(context);
        organism.addProgramCounterRelative(1);
        
        return true;
    }
}