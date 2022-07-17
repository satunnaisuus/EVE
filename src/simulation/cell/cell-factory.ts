import { EmptyCell } from "./type/empty-cell";
import { Genome } from "./type/organism/genome";
import { OrganicCell } from "./type/organic-cell";
import { OrganismCell } from "./type/organism-cell";
import { WallCell } from "./type/wall-cell";
import { AbstractCell } from "./abstract-cell";

export class CellFactory {
    private wall: WallCell;

    private empty: EmptyCell;

    private id: number = 0;

    create(type: string): AbstractCell {
        switch (type) {
            case 'wall':
                return this.createWall();
            case 'empty':
                return this.createEmpty();
            case 'organism':
                return this.createOrganism(Genome.createRandom(), 255);
            case 'organic':
                return this.createOrganic(255);
        }

        throw new Error();
    }

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

    createOrganic(energy: number): OrganicCell {
        return new OrganicCell(energy);
    }
}