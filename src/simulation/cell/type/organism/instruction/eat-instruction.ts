import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractInstruction } from "../abstract-instruction";

export class EatInstruction extends AbstractInstruction {
    execute(organism: OrganismCell, context: CellContext): boolean {
        organism.eat(context);
        organism.addProgramCounterRelative(1);
        
        return true;
    }
}