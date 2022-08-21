import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractOrgan } from "../abstract-organ";

export class Reproductor extends AbstractOrgan {
    use(organism: OrganismCell, parameter: number, context: CellContext): boolean {
        organism.changeEnergy(- context.getSimulationParameters().divideCost);
        organism.divide(context);

        return true;
    }

    sense(): boolean {
        return false;
    }
}