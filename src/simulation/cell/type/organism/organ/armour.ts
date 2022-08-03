import { AbstractOrgan } from "../abstract-organ";

const ARMOR_FACTOR = -0.5;

export class Armour extends AbstractOrgan {
    onAttack(power: number): number {
        return this.organism.changeEnergy(power * ARMOR_FACTOR);
    }
}