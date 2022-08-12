import { randomInt } from "../../../../common/random";
import { Color } from "../../../../common/color";
import { Program } from "./program";
import { GenomeSerialized } from "../../../types/cells";
import { shuffle } from "../../../../common/array-utils";

const SIMILARITY_LIMIT = 1;

export enum Organ {
    NONE = 0,
    CHLOROPLAST = 1,
    OXIDIZER = 2,
    EYE = 3,
    REPRODUCTOR = 4,
    MOUTH = 5,
    ARMOUR = 6,
    FIN = 7,
    SPINE = 8,
}

const BASE_ORGANS = [Organ.CHLOROPLAST, Organ.OXIDIZER, Organ.EYE, Organ.REPRODUCTOR];
const LIMB_ORGANS = [Organ.MOUTH, Organ.ARMOUR, Organ.FIN, Organ.SPINE];

const primitiveOrgans: Organ[] = [
    Organ.CHLOROPLAST,
    Organ.NONE,
    Organ.NONE,
    Organ.NONE,
    Organ.REPRODUCTOR,
    Organ.NONE,
    Organ.NONE,
    Organ.NONE,
    Organ.MOUTH,
    Organ.NONE,
    Organ.NONE,
    Organ.NONE,
    Organ.NONE,
    Organ.NONE,
    Organ.NONE,
    Organ.NONE
];

export const CURRENT_VERSION = 1;

export class Genome {
    constructor(
        private program: Program,
        private color: Color,
        private organs: Organ[],
    ) {
        
    }

    static createRandom(): Genome {
        return new Genome(
            Program.createPrimitive(16),
            Color.random(),
            primitiveOrgans
        );
    }

    isSimilar(genome: Genome): boolean {
        const otherOragans = genome.getOrgans();

        let differences = 0;

        for (let i = 0; i < 16; i++) {
            if (this.organs[i] !== otherOragans[i]) {
                differences++;
            }
        }

        return differences <= SIMILARITY_LIMIT;
    }

    getColor(): Color {
        return this.color;
    }

    getProgram(): Program {
        return this.program;
    }

    clone(mutationChance: number): Genome {
        if (mutationChance <= randomInt(0, 100)) {
            return this;
        }

        const color = new Color(
            this.color.getRed() + (Math.random() > 0.5 ? 1 : -1) * randomInt(0, 5),
            this.color.getGreen() + (Math.random() > 0.5 ? 1 : -1) * randomInt(0, 5),
            this.color.getBlue() + (Math.random() > 0.5 ? 1 : -1) * randomInt(0, 5)
        );

        const program = this.program.clone();
        const instruction = program.get(randomInt(0, program.getLength() - 1));
        const organs = this.organs.slice();
        let handler = program.getHandler(instruction.code);

        switch (randomInt(0, 5)) {
            case 0:
                instruction.code = randomInt(0, program.getHandlersCount() - 1);
                handler = program.getHandler(instruction.code);

                if (instruction.args.length > handler.getArgsCount()) {
                    instruction.args.splice(handler.getArgsCount());
                } else {
                    while (instruction.args.length < handler.getArgsCount()) {
                        instruction.args.push(Math.random());
                    }
                }

                if (instruction.branches.length > handler.getBranchesCount()) {
                    instruction.branches.splice(handler.getBranchesCount());
                } else {
                    while (instruction.branches.length < handler.getBranchesCount()) {
                        instruction.branches.push(randomInt(0, program.getLength() - 1));
                    }
                }

                break;
            
            case 1:
                if (instruction.args.length > 0) {
                    instruction.args[randomInt(0, instruction.args.length - 1)] = Math.random();
                }
                break;

            case 2:
                if (instruction.branches.length > 0) {
                    instruction.branches[randomInt(0, instruction.branches.length - 1)] = randomInt(0, program.getLength() - 1);
                }
                break;
            
            case 3:
                organs[randomInt(0, 7)] = shuffle(BASE_ORGANS)[0];
                break;
            
            case 4:
                organs[randomInt(8, 15)] = shuffle(LIMB_ORGANS)[0];
                break;

            case 5:
                organs[randomInt(0, 15)] = Organ.NONE;
                break;

        }

        return new Genome(program, color, organs);
    }

    getProgramLength(): number {
        return this.program.getLength();
    }

    getOrgans(): Organ[] {
        return this.organs;
    }

    serialize(): GenomeSerialized {
        return {
            color: this.color.toHexFormat(),
            program: this.program.serialize(),
            organs: this.organs,
            version: CURRENT_VERSION,
        };
    }
}