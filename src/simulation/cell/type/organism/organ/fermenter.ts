import { OrganismCell } from "../../organism-cell";
import { AbstractOrgan } from "../abstract-organ";

const PARAMETER_FACTOR = 17;

export class Fermenter extends AbstractOrgan {
    use(): boolean {
        return false;
    }

    sense(organism: OrganismCell, parameter: number): boolean {
        return organism.getEnergy() >= parameter * PARAMETER_FACTOR;
    }
}