import { CellContext } from "../../../cell-context";
import { OrganicCell } from "../../organic-cell";
import { MAX_ENERGY, OrganismCell } from "../../organism-cell";
import { AbstractOrgan } from "../abstract-organ";
import { getOffset, reverseDirection, rotateOnOffset } from "../direction";

const ADDITIONAL_MOUTH_COST = 64;

export class Mouth extends AbstractOrgan {
    sense(): boolean {
        return false;
    }
    
    use(parameter: number, context: CellContext): boolean {
        const fine = ADDITIONAL_MOUTH_COST * (this.organism.getMouthsCount() - 1);
        const cost = context.getSimulationParameters().eatCost;
        this.organism.changeEnergy(- cost - fine);

        const direction = rotateOnOffset(this.organism.getDirection(), this.position)
        const offset = getOffset(direction);
        const target = context.getByOffest(offset[0], offset[1]);
        
        if (target instanceof OrganicCell) {
            const energy = target.getEnergy();
            this.organism.changeEnergy(energy);
            context.deleteByOffset(offset[0], offset[1]);

            if (energy > 0) {
                this.organism.makeMoreRed(energy);
            }

            return true;
        }
        
        if (target instanceof OrganismCell) {
            const power = Math.floor(MAX_ENERGY * parameter);
            const attackFactor = context.getSimulationParameters().attackCostRate / 100;
            const attackCost = power * attackFactor;
            const energy = - target.onAttack(power, this.organism, reverseDirection(direction));
            this.organism.changeEnergy(energy - attackCost);

            if (target.getEnergy() === 0) {
                context.deleteByOffset(offset[0], offset[1]);
            }

            if (energy > 0) {
                this.organism.makeMoreRed(energy);
            }
            
            return true;
        }

        return false;
    }
}