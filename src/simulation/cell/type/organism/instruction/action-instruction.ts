import { CellContext } from "../../../cell-context";
import { OrganismCell, ORGANS_COUNT } from "../../organism-cell";
import { AbstractInstruction } from "../abstract-instruction";

export const PARAMETER_FACTOR = 17;

export class ActionInstruction extends AbstractInstruction {
    execute(organism: OrganismCell, context: CellContext, arg: number): boolean {
        const organIndex = Math.trunc(arg / ORGANS_COUNT);
        const parameter = arg - organIndex * ORGANS_COUNT;
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