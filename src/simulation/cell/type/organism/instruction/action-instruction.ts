import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractInstruction } from "../abstract-instruction";

export const DIVIDER = 16;

export class ActionInstruction extends AbstractInstruction {
    execute(organism: OrganismCell, context: CellContext, arg: number): boolean {
        const organIndex = Math.trunc(arg / DIVIDER);
        const parameter = arg - organIndex * DIVIDER;
        const organ = context.getOrganPool().getOrgan(organism.getOrgan(organIndex));

        if (! organ) {
            organism.addProgramCounterRelative(1);
            return false;
        }

        const breakExecution = organ.use(organism, parameter, context, organIndex);
        organism.addProgramCounterRelative(1);
        
        return breakExecution;
    }

    hasArgument(): boolean {
        return true;
    }

    hasGoto(): boolean {
        return false;
    }
}