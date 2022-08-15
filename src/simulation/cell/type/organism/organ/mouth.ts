import { CellContext } from "../../../cell-context";
import { OrganicCell } from "../../organic-cell";
import { OrganismCell } from "../../organism-cell";
import { AbstractOrgan } from "../abstract-organ";
import { getOffset, reverseDirection, rotateOnOffset } from "../direction";

const ATTACK_POWER = 50;

export class Mouth extends AbstractOrgan {
    sense(): boolean {
        return false;
    }
    
    use(parameter: number, context: CellContext): boolean {
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
            const energy = - target.onAttack(ATTACK_POWER, this.organism, reverseDirection(direction));
            this.organism.changeEnergy(energy);

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