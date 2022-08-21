import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractOrgan } from "../abstract-organ";

export class Chloroplast extends AbstractOrgan {
    use(organism: OrganismCell, parameter: number, context: CellContext): boolean {
        const chloroplastsCount = organism.getChloroplastsCount();
        let energy = 0;

        for (let i = 1; i <= chloroplastsCount; i++) {
            energy += context.getLightEnergy() / i;
        }

        organism.changeEnergy(energy);

        if (energy > 0) {
            organism.makeMoreGreen(energy);
        }

        return true;
    }

    sense(): boolean {
        return false;
    }
}