import { EmptyCell } from "./type/empty-cell";
import { Genome, Organ } from "./type/organism/genome";
import { OrganicCell } from "./type/organic-cell";
import { OrganismCell } from "./type/organism-cell";
import { WallCell } from "./type/wall-cell";
import { AbstractCell } from "./abstract-cell";
import { Direction, randomDirection } from "./type/organism/direction";
import { Color } from "../../common/color";
import { InstructionConfig, Program } from "./type/organism/program";

export interface CreateOptions {
    genome?: {
        color: string;
        divideLimit: number;
        organs: Organ[];
        program: InstructionConfig[];
    } 
}

export class CellFactory {
    private wall: WallCell;

    private empty: EmptyCell;

    private id: number = 0;

    create(type: string, options: CreateOptions): AbstractCell {
        switch (type) {
            case 'wall':
                return this.createWall();
            case 'empty':
                return this.createEmpty();
            case 'organism':
                let genome;

                if (options.genome) {
                    genome = new Genome(
                        new Program(options.genome.program),
                        Color.fromHex(options.genome.color),
                        options.genome.divideLimit,
                        options.genome.organs
                    );
                } else {
                    genome = Genome.createRandom();
                }

                return this.createOrganism(genome, 255, randomDirection(), new Color(255, 255, 255));
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

    createOrganism(genome: Genome, energy: number, direction: Direction, supplyColor: Color): OrganismCell {
        return new OrganismCell(++this.id, genome, energy, direction, supplyColor);
    }

    createOrganic(energy: number): OrganicCell {
        return new OrganicCell(energy);
    }
}