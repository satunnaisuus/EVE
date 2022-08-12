import { CellContext } from "../../../cell-context";
import { MAX_ENERGY, OrganismCell } from "../../organism-cell";
import { AbstractInstruction } from "../abstract-instruction";

export class EnergyGtInstruction extends AbstractInstruction {
    execute(organism: OrganismCell, context: CellContext, args: number[], branches: number[]): boolean {
        if (organism.getEnergy() > MAX_ENERGY * args[0]) {
            organism.setProgramCounter(branches[0]);
        } else {
            organism.addProgramCounterRelative(1);
        }

        return false;
    }

    getArgsCount(): number {
        return 1;
    }

    getBranchesCount(): number {
        return 1;
    }
}