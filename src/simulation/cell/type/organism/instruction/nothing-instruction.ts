import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractInstruction } from "../abstract-instruction";

export class NothingInstruction extends AbstractInstruction {
    execute(organism: OrganismCell, context: CellContext, args: number[], branches: number[]): boolean {
        organism.addProgramCounterRelative(1);
        
        return false;
    }

    getArgsCount(): number {
        return 0;
    }

    getBranchesCount(): number {
        return 0;
    }
}