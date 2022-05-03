import { EmptyCell } from "./empty-cell";
import Genome from "./genome";
import { MeatCell } from "./meat-cell";
import { OrganismCell } from "./organism-cell";
import { PlantCell } from "./plant-cell";
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

    createOrganism(genome: Genome, energy: number = undefined): OrganismCell {
        return new OrganismCell(genome, energy);
    }

    createPlant(): PlantCell {
        return new PlantCell();
    }

    createMeat(): MeatCell {
        return new MeatCell();
    }
}