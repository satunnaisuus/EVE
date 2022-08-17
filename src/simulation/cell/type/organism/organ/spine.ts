import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractOrgan } from "../abstract-organ";

export class Spine extends AbstractOrgan {
    onAttack(power: number, aggressor: OrganismCell, context: CellContext): number {
        aggressor.changeEnergy(- power * context.getSimulationParameters().spineDamageRate);
        return this.organism.changeEnergy(- power);
    }

    use(): boolean {
        return true;
    }

    sense(): boolean {
        return false;
    }
}