import { EmptyCell } from "./type/empty-cell";
import { OrganicCell } from "./type/organic-cell";
import { createPrimitiveProgram, MAX_ENERGY, Organ, OrganismCell } from "./type/organism-cell";
import { WallCell } from "./type/wall-cell";
import { AbstractCell } from "./abstract-cell";
import { Direction, randomDirection } from "./type/organism/direction";
import { Color } from "../../common/color";
import { Cell, CellType } from "../types/cells";

export interface CreateOptions {
    genome?: {
        color: string;
        organs: Organ[];
        program: number[];
    } 
}

export const PRIMITIVE_ORGANS: Organ[] = [
    Organ.EYE,
    Organ.CHLOROPLAST,
    Organ.NONE,
    Organ.FERMENTER,
    Organ.REPRODUCTOR,
    Organ.NONE,
    Organ.NONE,
    Organ.NONE,
    Organ.MOUTH,
    Organ.NONE,
    Organ.NONE,
    Organ.NONE,
    Organ.FIN,
    Organ.NONE,
    Organ.NONE,
    Organ.NONE
];

export class CellFactory {
    private wall: WallCell;

    private empty: EmptyCell;

    private id = 0;

    private organics: {[key: number]: OrganicCell} = {};

    constructor(private programLength: number) {
        for (let i = 0; i <= MAX_ENERGY; i++) {
            this.organics[i] = new OrganicCell(i);
        }

        this.wall = new WallCell();
        this.empty = new EmptyCell();
    }

    create(type: CellType, options: CreateOptions): AbstractCell {
        switch (type) {
            case CellType.WALL:
                return this.createWall();
            case CellType.EMPTY:
                return this.createEmpty();
            case CellType.ORGANISM:
                return this.createOrganism(
                    options.genome ? options.genome.organs : PRIMITIVE_ORGANS,
                    options.genome ? Color.fromHex(options.genome.color) : Color.random(),
                    options.genome ? new Uint8Array(options.genome.program) : createPrimitiveProgram(this.programLength),
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
                    cell.genome.organs,
                    Color.fromHex(cell.genome.color),
                    new Uint8Array(cell.genome.program),
                    cell.energy,
                    cell.direction,
                    Color.fromHex(cell.supplyColor),
                    cell.lifetime
                );
        }
    }

    createWall(): WallCell {
        return this.wall;
    }

    createEmpty(): EmptyCell {
        return this.empty;
    }

    createOrganism(organs: Organ[], color: Color, program: Uint8Array, energy: number, direction: Direction, supplyColor: Color): OrganismCell {
        return new OrganismCell(
            ++this.id,
            organs,
            color,
            program,
            energy,
            direction,
            supplyColor
        );
    }

    createOrganic(energy: number): OrganicCell {
        return this.organics[energy];
    }
}