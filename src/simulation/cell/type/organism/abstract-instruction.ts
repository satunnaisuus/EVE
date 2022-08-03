import { CellContext } from "../../cell-context";
import { OrganismCell } from "../organism-cell";

export abstract class AbstractInstruction {
    abstract execute(organism: OrganismCell, context: CellContext, args: number[], branches: number[]): boolean;

    abstract getArgsCount(): number;

    abstract getBranchesCount(): number;
}