import { AbstractCell } from "../../abstract-cell";
import { CellContext } from "../../cell-context";
import { OrganicCell } from "../organic-cell";
import { OrganismCell } from "../organism-cell";
import { WallCell } from "../wall-cell";
import { getOffset } from "./direction";

export enum TargetType {
    EMPTY,
    WALL,
    ORGANIC,
    ORGANISM_SIMILAR,
    ORGANISM_OTHER
}

export abstract class AbstractInstruction {
    abstract execute(organism: OrganismCell, context: CellContext): boolean;

    protected getTarget(organism: OrganismCell, context: CellContext): AbstractCell {
        const offsetByDirection = getOffset(organism.getDirection());
        return context.getByOffest(offsetByDirection[0], offsetByDirection[1]);
    }
    
    protected getTargetType(organism: OrganismCell, cell: AbstractCell): TargetType {
        if (organism instanceof WallCell) {
            return TargetType.WALL;
        }
        
        if (cell instanceof OrganicCell) {
            return TargetType.ORGANIC;
        }
        
        if (cell instanceof OrganismCell) {
            return organism.isSimilar(cell) ? TargetType.ORGANISM_SIMILAR : TargetType.ORGANISM_OTHER;
        }

        return TargetType.EMPTY;
    }
}