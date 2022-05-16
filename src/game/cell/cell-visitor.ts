import { EmptyCell } from "./type/empty-cell";
import { OrganicCell } from "./type/organic-cell";
import { OrganismCell } from "./type/organism-cell";
import { WallCell } from "./type/wall-cell";

export class CellVisitor {
    visitEmpty(cell: EmptyCell): void {
        
    }

    visitWall(cell: WallCell): void {
        
    }

    visitOrganism(cell: OrganismCell): void {
        
    }

    visitOrganic(cell: OrganicCell): void {
        
    }
}