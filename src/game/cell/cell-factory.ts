import { Color } from "../../common/color";
import { EmptyCell } from "./type/empty-cell";
import { Genome } from "./type/organism/genome";
import { MeatCell } from "./type/meat-cell";
import { OrganismCell } from "./type/organism-cell";
import { PlantCell } from "./type/plant-cell";
import { WallCell } from "./type/wall-cell";

export class CellFactory {
    private wall: WallCell;

    private empty: EmptyCell;

    private plant: PlantCell;

    private meat: MeatCell;

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

    createOrganism(color: Color, genome: Genome, energy: number): OrganismCell {
        return new OrganismCell(color, genome, energy);
    }

    createPlant(): PlantCell {
        if (this.plant) {
            return this.plant;
        }

        return this.plant = new PlantCell();
    }

    createMeat(): MeatCell {
        if (this.meat) {
            return this.meat;
        }

        return this.meat = new MeatCell();
    }
}