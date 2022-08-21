import { CellContext } from "../../cell-context";
import { OrganismCell } from "../organism-cell";

export abstract class AbstractOrgan {
    abstract use(organism: OrganismCell, parameter: number, context: CellContext, position: number): boolean;

    abstract sense(organism: OrganismCell, parameter: number, context: CellContext, position: number): boolean;

    onAttack(organism: OrganismCell, power: number, aggressor: OrganismCell, context: CellContext): number {
        return organism.changeEnergy(- power);
    }
}