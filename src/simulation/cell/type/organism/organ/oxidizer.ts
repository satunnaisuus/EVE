import { CellContext } from "../../../cell-context";
import { AbstractOrgan } from "../abstract-organ";

export class Oxidizer extends AbstractOrgan {
    use(parameter: number, context: CellContext): boolean {
        const oxydizersCount = this.organism.getOxidizersCount();
        const amount = this.organism.changeEnergy(oxydizersCount * context.getMineralsEnergy());

            this.organism.makeMoreBlue(amount);
        }

        return true;
    }
}