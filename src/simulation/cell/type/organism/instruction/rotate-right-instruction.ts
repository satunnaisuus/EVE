import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractInstruction } from "../abstract-instruction";

export class RotateRightInstruction extends AbstractInstruction {
    execute(organism: OrganismCell, context: CellContext): boolean {
        organism.rotateRight();
        organism.addProgramCounterRelative(1);
        
        return false;
    }
}