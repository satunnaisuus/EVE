import { EmptyCell } from "./type/empty-cell";
import { Genome, Organ } from "./type/organism/genome";
import { OrganicCell } from "./type/organic-cell";
import { OrganismCell } from "./type/organism-cell";
import { WallCell } from "./type/wall-cell";
import { AbstractCell } from "./abstract-cell";
import { Direction, randomDirection } from "./type/organism/direction";
import { Color } from "../../common/color";
import { InstructionConfig, Program } from "./type/organism/program";
import { Cell, CellType } from "../types/cells";

export interface CreateOptions {
    genome?: {
        color: string;
        organs: Organ[];
        program: InstructionConfig[];
    } 
}

export class CellFactory {
    private wall: WallCell;

    private empty: EmptyCell;

    private id = 0;

    create(type: CellType, options: CreateOptions): AbstractCell {
        switch (type) {
            case CellType.WALL:
                return this.createWall();
            case CellType.EMPTY:
                return this.createEmpty();
            case CellType.ORGANISM:
                return this.createOrganism(
                    options.genome ? new Genome(
                        new Program(options.genome.program),
                        Color.fromHex(options.genome.color),
                        options.genome.organs
                    ) : Genome.createRandom(),
                    255,
                    randomDirection(),
                    new Color(255, 255, 255)
                );
            case CellType.ORGANIC:
                return this.createOrganic(255);
        }
    }

    deserialize(cell: Cell): AbstractCell {
        switch (cell.type) {
            case CellType.EMPTY:
                return this.createEmpty();
            case CellType.ORGANIC:
                return this.createOrganic(cell.energy);
            case CellType.WALL:
                return this.createWall();
            case CellType.ORGANISM:
                return new OrganismCell(
                    cell.id,
                    new Genome(
                        new Program(cell.genome.program),
                        Color.fromHex(cell.genome.color),
                        cell.genome.organs
                    ),
                    cell.energy,
                    cell.direction,
                    Color.fromHex(cell.supplyColor)
                );
        }
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