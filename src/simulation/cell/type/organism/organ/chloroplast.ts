import { CellContext } from "../../../cell-context";
import { AbstractOrgan } from "../abstract-organ";

export class Chloroplast extends AbstractOrgan {
    use(parameter: number, context: CellContext): boolean {
        const chloroplastsCount = this.organism.getChloroplastsCount();
        let energy = 0;

        for (let i = 1; i <= chloroplastsCount; i++) {
            energy += context.getLightEnergy() / i;
        }

        this.organism.changeEnergy(energy);

        if (energy > 0) {
            this.organism.makeMoreGreen(energy);
        }

        return true;
    }

    sense(): boolean {
        return false;
    }
}