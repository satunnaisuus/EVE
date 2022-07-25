import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractInstruction, TargetType } from "../abstract-instruction";

export class IfInstruction extends AbstractInstruction {
    constructor(private type: TargetType) {
        super();
    }

    execute(organism: OrganismCell, context: CellContext): boolean {
        if (this.type === this.getTargetType(organism, this.getTarget(organism, context))) {
            organism.addProgramCounterRelative(organism.getArgument(0));
        }

        organism.addProgramCounterRelative(2);
        
        return false;
    }
}