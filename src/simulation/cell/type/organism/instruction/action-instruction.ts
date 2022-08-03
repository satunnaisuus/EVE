import { CellContext } from "../../../cell-context";
import { OrganismCell, ORGANS_COUNT } from "../../organism-cell";
import { AbstractInstruction } from "../abstract-instruction";

export class ActionInstruction extends AbstractInstruction {
    execute(organism: OrganismCell, context: CellContext, args: number[], branches: number[]): boolean {
        const organIndex = Math.floor(args[0] * ORGANS_COUNT);
        const organ = organism.getOrgan(organIndex);

        if (! organ) {
            return false;
        }

        organ.use(args[1], context);

        organism.addProgramCounterRelative(1);
        
        return true;
    }

    getArgsCount(): number {
        return 2;
    }

    getBranchesCount(): number {
        return 0;
    }
}