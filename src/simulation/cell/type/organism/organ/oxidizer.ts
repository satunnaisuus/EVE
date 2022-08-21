import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractOrgan } from "../abstract-organ";

export class Oxidizer extends AbstractOrgan {
    use(organism: OrganismCell, parameter: number, context: CellContext): boolean {
        const oxydizersCount = organism.getOxidizersCount();
        let energy = 0;

        for (let i = 1; i <= oxydizersCount; i++) {
            energy += context.getMineralsEnergy() / i;
        }

        organism.changeEnergy(energy);

        if (energy > 0) {
            organism.makeMoreBlue(energy);
        }

        return true;
    }

    sense(): boolean {
        return false;
    }
}