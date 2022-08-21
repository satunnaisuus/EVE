import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractInstruction } from "../abstract-instruction";

export class EnergyGtInstruction extends AbstractInstruction {
    execute(organism: OrganismCell, context: CellContext, arg: number, goto: number): boolean {
        if (organism.getEnergy() > arg) {
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