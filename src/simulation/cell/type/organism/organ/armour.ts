import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractOrgan } from "../abstract-organ";

export class Armour extends AbstractOrgan {
    onAttack(organism: OrganismCell, power: number, aggressor: OrganismCell, context: CellContext): number {
        return organism.changeEnergy(- power * context.getSimulationParameters().armourProtectionRate);
    }

    use(): boolean {
        return false;
    }

    sense(): boolean {
        return false;
    }
}