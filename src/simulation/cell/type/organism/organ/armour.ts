import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractOrgan } from "../abstract-organ";

export class Armour extends AbstractOrgan {
    onAttack(power: number, aggressor: OrganismCell, context: CellContext): number {
        return this.organism.changeEnergy(- power * context.getSimulationParameters().armourProtectionRate);
    }

    use(): boolean {
        return true;
    }

    sense(): boolean {
        return false;
    }
}