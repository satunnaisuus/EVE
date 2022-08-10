import { CellContext } from "../../cell-context";
import { OrganismCell } from "../organism-cell";

export abstract class AbstractOrgan {
    constructor(
        protected organism: OrganismCell,
        protected position: number
    ) {

    }

    abstract use(parameter: number, context: CellContext): boolean;
}