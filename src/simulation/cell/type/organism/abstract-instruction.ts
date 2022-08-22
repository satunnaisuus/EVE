import { CellContext } from "../../cell-context";
import { OrganismCell, ORGANS_COUNT } from "../organism-cell";

export const getOrganIndex = (arg: number) => Math.trunc(arg / ORGANS_COUNT);

export const getParameter = (arg: number) => arg - getOrganIndex(arg) * ORGANS_COUNT;

export abstract class AbstractInstruction {
    abstract execute(organism: OrganismCell, context: CellContext, arg: number, goto: number): boolean;

    abstract hasArgument(): boolean;

    abstract hasGoto(): boolean;
}