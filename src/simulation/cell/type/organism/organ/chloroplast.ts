import { CellContext } from "../../../cell-context";
import { AbstractOrgan } from "../abstract-organ";

export class Chloroplast extends AbstractOrgan {
    use(parameter: number, context: CellContext): boolean {
        const oxydizersCount = this.organism.getChloroplastsCount();
        const amount = this.organism.changeEnergy(oxydizersCount * context.getLightEnergy());

        if (amount > 0) {
            this.organism.makeMoreGreen();
        }

        return true;
    }
}