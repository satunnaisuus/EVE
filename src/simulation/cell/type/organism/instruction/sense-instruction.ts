import { CellContext } from "../../../cell-context";
import { OrganismCell, ORGANS_COUNT } from "../../organism-cell";
import { AbstractInstruction } from "../abstract-instruction";

export class SenseInstruction extends AbstractInstruction {
    execute(organism: OrganismCell, context: CellContext, args: number[], branches: number[]): boolean {
        const organIndex = Math.floor(args[0] * ORGANS_COUNT);
        const organ = organism.getOrgan(organIndex);

        if (! organ) {
            organism.addProgramCounterRelative(1);
            return false;
        }

        if (organ.sense(args[1], context)) {
            organism.setProgramCounter(branches[0]);
        } else {
            organism.addProgramCounterRelative(1);
        }

        return false;
    }

    getArgsCount(): number {
        return 2;
    }

    getBranchesCount(): number {
        return 1;
    }
}