import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractInstruction } from "../abstract-instruction";

export class ChemosynthesisInstruction extends AbstractInstruction {
    execute(organism: OrganismCell, context: CellContext): boolean {
        organism.chemosynthesis(context.getMineralsEnergy());
        organism.addProgramCounterRelative(1);
        
        return true;
    }
}