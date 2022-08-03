import { AbstractCell } from "../../../abstract-cell";
import { CellContext } from "../../../cell-context";
import { OrganicCell } from "../../organic-cell";
import { OrganismCell } from "../../organism-cell";
import { WallCell } from "../../wall-cell";
import { AbstractOrgan } from "../abstract-organ";
import { getOffset, rotateOnOffset } from "../direction";

enum TargetType {
    EMPTY,
    WALL,
    ORGANIC,
    ORGANISM_SIMILAR,
    ORGANISM_OTHER
}

const PARAMETER_FACTOR = Object.keys(TargetType).length / 2 + 1;

export class Eye extends AbstractOrgan {
    use(parameter: number, context: CellContext): boolean {
        const offset = getOffset(rotateOnOffset(this.organism.getDirection(), this.position));
        const target = context.getByOffest(offset[0], offset[1]);
        
        return this.getTargetType(target) === Math.floor(parameter * PARAMETER_FACTOR);
    }
    
    private getTargetType(cell: AbstractCell): TargetType {
        if (cell instanceof WallCell) {
            return TargetType.WALL;
        }
        
        if (cell instanceof OrganicCell) {
            return TargetType.ORGANIC;
        }
        
        if (cell instanceof OrganismCell) {
            return this.organism.isSimilar(cell) ? TargetType.ORGANISM_SIMILAR : TargetType.ORGANISM_OTHER;
        }

        return TargetType.EMPTY;
    }
}