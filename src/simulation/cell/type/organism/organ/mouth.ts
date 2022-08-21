import { CellContext } from "../../../cell-context";
import { OrganicCell } from "../../organic-cell";
import { OrganismCell } from "../../organism-cell";
import { AbstractOrgan } from "../abstract-organ";
import { reverseDirection, rotateOnOffset } from "../direction";

const ADDITIONAL_MOUTH_COST = 64;

export class Mouth extends AbstractOrgan {
    sense(): boolean {
        return false;
    }
    
    use(organism: OrganismCell, parameter: number, context: CellContext, position: number): boolean {
        const fine = ADDITIONAL_MOUTH_COST * (organism.getMouthsCount() - 1);
        const cost = context.getSimulationParameters().eatCost;
        organism.changeEnergy(- cost - fine);

        const direction = rotateOnOffset(organism.getDirection(), position)
        const target = context.getByDirection(direction);
        
        if (target instanceof OrganicCell) {
            const energy = target.getEnergy();
            organism.changeEnergy(energy);
            context.deleteByDirection(direction);

            if (energy > 0) {
                organism.makeMoreRed(energy);
            }

            return true;
        }
        
        if (target instanceof OrganismCell) {
            const power = parameter;
            const attackFactor = context.getSimulationParameters().attackCostRate / 100;
            const attackCost = power * attackFactor;

            let energy = 0;

            if (target.getEnergy() > 0) {
                const organPosition = 8 + rotateOnOffset(target.getDirection(), reverseDirection(direction));
                const limb = context.getOrganPool().getOrgan(target.getOrgan(organPosition));
    
                if (limb === null) {
                    energy = - target.changeEnergy(- power);
                } else {
                    energy = - limb.onAttack(target, power, organism, context);
                }
            }

            let digestibilityFactor = 0.5;
            for (let i = 1; i <= organism.getFermentersCount(); i++) {
                digestibilityFactor += 0.25 / i;
            }

            organism.changeEnergy(energy * digestibilityFactor - attackCost);

            if (target.getEnergy() === 0) {
                context.deleteByDirection(direction);
            }

            if (energy > 0) {
                organism.makeMoreRed(energy);
            }
            
            return true;
        }

        return false;
    }
}