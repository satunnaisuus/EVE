import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractOrgan } from "../abstract-organ";

export class Spine extends AbstractOrgan {
    onAttack(organism: OrganismCell, power: number, aggressor: OrganismCell, context: CellContext): number {
        aggressor.changeEnergy(- power * context.getSimulationParameters().spineDamageRate);
        return organism.changeEnergy(- power);
    }

    use(): boolean {
        return false;
    }

    sense(): boolean {
        return false;
    }
}