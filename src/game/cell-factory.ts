import { EmptyCell } from "./empty-cell";
import { OrganismCell } from "./organism-cell";
import { WallCell } from "./wall";

export default class CellFactory {
    private wall: WallCell;

    private empty: EmptyCell;

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

    createOrganism(): OrganismCell {
        return new OrganismCell();
    }
}