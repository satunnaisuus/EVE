import { OrganismCell } from "../../organism-cell";
import { AbstractOrgan } from "../abstract-organ";
import { PARAMETER_FACTOR } from "../instruction/sense-instruction";

export const getEnergyFromParameter = (parameter: number) => parameter * PARAMETER_FACTOR;

export class Fermenter extends AbstractOrgan {
    use(): boolean {
        return false;
    }

    sense(organism: OrganismCell, parameter: number): boolean {
        return organism.getEnergy() >= parameter * PARAMETER_FACTOR;
    }
}