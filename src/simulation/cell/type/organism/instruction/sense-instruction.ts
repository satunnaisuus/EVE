import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractInstruction } from "../abstract-instruction";

export const DIVIDER = 16;

export class SenseInstruction extends AbstractInstruction {
    execute(organism: OrganismCell, context: CellContext, arg: number, goto: number): boolean {
        const organIndex = Math.trunc(arg / DIVIDER);
        const parameter = arg - organIndex * DIVIDER;
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