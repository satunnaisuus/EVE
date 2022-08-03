import { CellContext } from "../../../cell-context";
import { OrganicCell } from "../../organic-cell";
import { OrganismCell } from "../../organism-cell";
import { AbstractOrgan } from "../abstract-organ";
import { getOffset, reverseDirection, rotateOnOffset } from "../direction";

const ATTACK_POWER = 50;

export class Mouth extends AbstractOrgan {
    use(parameter: number, context: CellContext): boolean {
        const direction = rotateOnOffset(this.organism.getDirection(), this.position)
        const offset = getOffset(direction);
        const target = context.getByOffest(offset[0], offset[1]);
        
        if (target instanceof OrganicCell) {
            const amount = this.organism.changeEnergy(target.getEnergy());
            context.deleteByOffset(offset[0], offset[1]);

            if (amount > 0) {
                this.organism.makeMoreRed();
            }

            return true;
        }
        
        if (target instanceof OrganismCell) {
            const energy = target.onAttack(ATTACK_POWER, this.organism, reverseDirection(direction));
            const amount = this.organism.changeEnergy(energy);

            if (amount > 0) {
                this.organism.makeMoreRed();
            }
            
            return true;
        }

        return false;
    }
}