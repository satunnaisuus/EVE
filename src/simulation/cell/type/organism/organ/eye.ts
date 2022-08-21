import { AbstractCell } from "../../../abstract-cell";
import { CellContext } from "../../../cell-context";
import { EmptyCell } from "../../empty-cell";
import { OrganicCell } from "../../organic-cell";
import { OrganismCell } from "../../organism-cell";
import { WallCell } from "../../wall-cell";
import { AbstractOrgan } from "../abstract-organ";
import { rotateOnOffset } from "../direction";

enum TargetType {
    EMPTY,
    WALL,
    ORGANIC,
    ORGANISM_SIMILAR,
    ORGANISM_OTHER
}

const PARAMETER_FACTOR = Object.keys(TargetType).length / 2 + 1;

export class Eye extends AbstractOrgan {
    use(): boolean {
        return false;
    }

    sense(organism: OrganismCell, parameter: number, context: CellContext, position: number): boolean {
        const target = context.getByDirection(
            rotateOnOffset(organism.getDirection(), position)
        );
        
        return this.getTargetType(organism, target) === parameter % PARAMETER_FACTOR;
    }
    
    private getTargetType(organism: OrganismCell, target: AbstractCell): TargetType {
        if (target instanceof WallCell) {
            return TargetType.WALL;
        }
        
        if (target instanceof OrganicCell) {
            return TargetType.ORGANIC;
        }

        if (target instanceof EmptyCell) {
            return TargetType.EMPTY;
        }
        
        if (target instanceof OrganismCell) {
            return organism.isSimilar(target) ? TargetType.ORGANISM_SIMILAR : TargetType.ORGANISM_OTHER;
        }
    }
}