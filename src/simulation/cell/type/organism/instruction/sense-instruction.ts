import { CellContext } from "../../../cell-context";
import { OrganismCell, ORGANS_COUNT } from "../../organism-cell";
import { AbstractInstruction } from "../abstract-instruction";

export const PARAMETER_FACTOR = 17;

export class SenseInstruction extends AbstractInstruction {
    execute(organism: OrganismCell, context: CellContext, arg: number, goto: number): boolean {
        const organIndex = Math.trunc(arg / ORGANS_COUNT);
        const parameter = arg - organIndex * ORGANS_COUNT;
        const organ = context.getOrganPool().getOrgan(organism.getOrgan(organIndex));

        if (! organ) {
            organism.addProgramCounterRelative(1);
            return false;
        }

        if (organ.sense(organism, parameter, context, organIndex)) {
            organism.setProgramCounter(goto);
        } else {
            organism.addProgramCounterRelative(1);
        }

        return false;
    }

    hasArgument(): boolean {
        return true;
    }

    hasGoto(): boolean {
        return true;
    }
}