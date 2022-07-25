import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractInstruction } from "../abstract-instruction";

export class NothingInstruction extends AbstractInstruction {
    execute(organism: OrganismCell, context: CellContext): boolean {
        return false;
    }
}