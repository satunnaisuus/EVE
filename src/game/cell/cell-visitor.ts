import { EmptyCell } from "./type/empty-cell";
import { MeatCell } from "./type/meat-cell";
import { OrganismCell } from "./type/organism-cell";
import { PlantCell } from "./type/plant-cell";
import { WallCell } from "./type/wall-cell";

export class CellVisitor {
    visitEmpty(cell: EmptyCell): void {
        
    }

    visitWall(cell: WallCell): void {
        
    }

    visitOrganism(cell: OrganismCell): void {
        
    }

    visitPlant(cell: PlantCell): void {
        
    }

    visitMeat(cell: MeatCell): void {
        
    }
}