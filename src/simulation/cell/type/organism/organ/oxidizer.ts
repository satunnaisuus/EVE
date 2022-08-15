import { CellContext } from "../../../cell-context";
import { AbstractOrgan } from "../abstract-organ";

export class Oxidizer extends AbstractOrgan {
    use(parameter: number, context: CellContext): boolean {
        const oxydizersCount = this.organism.getOxidizersCount();
        let energy = 0;

        for (let i = 1; i <= oxydizersCount; i++) {
            energy += context.getMineralsEnergy() / i;
        }

        this.organism.changeEnergy(energy);

        if (energy > 0) {
            this.organism.makeMoreBlue(energy);
        }

        return true;
    }
}