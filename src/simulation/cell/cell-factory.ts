import { EmptyCell } from "./type/empty-cell";
import { Genome } from "./type/organism/genome";
import { OrganicCell } from "./type/organic-cell";
import { OrganismCell } from "./type/organism-cell";
import { WallCell } from "./type/wall-cell";

export class CellFactory {
    private wall: WallCell;

    private empty: EmptyCell;

    private organic: OrganicCell;

    private id: number = 0;

    createWall(): WallCell {
        if (this.wall) {
            return this.wall;
        }

        return this.wall = new WallCell();
    }

    createEmpty(): EmptyCell {
        if (this.empty) {
            return this.empty;
        }

        return this.empty = new EmptyCell();
    }

    createOrganism(genome: Genome, energy: number): OrganismCell {
        return new OrganismCell(++this.id, genome, energy);
    }

    createOrganic(): OrganicCell {
        if (this.organic) {
            return this.organic;
        }

        return this.organic = new OrganicCell();
    }
}