import { OrganismCell } from "../../organism-cell";
import { AbstractOrgan } from "../abstract-organ";

const SPINE_DAMAGE = 20;

export class Spine extends AbstractOrgan {
    onAttack(power: number, enemy: OrganismCell): number {
        enemy.changeEnergy(- SPINE_DAMAGE);
        return this.organism.changeEnergy(- power);
    }
}