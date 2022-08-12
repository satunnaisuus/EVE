import { CellContext } from "../../../cell-context";
import { AbstractOrgan } from "../abstract-organ";

export class Reproductor extends AbstractOrgan {
    use(parameter: number, context: CellContext): boolean {
        this.organism.divide(context);

        return true;
    }
}