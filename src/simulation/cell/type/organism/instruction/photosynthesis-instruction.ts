import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractInstruction } from "../abstract-instruction";

export class PhotosynthesisInstruction extends AbstractInstruction {
    execute(organism: OrganismCell, context: CellContext): boolean {
        organism.photosynthesis(context.getLightEnergy());
        organism.addProgramCounterRelative(1);
        
        return true;
    }
}