import { randomInt } from "../../../../common/random";
import { Color } from "../../../../common/color";
import { Program } from "./program";
import { GenomeSerialized } from "../../../types/cells";
import { shuffle } from "../../../../common/array-utils";
import { SimulationParameters } from "../../../simulation-parameters";

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

const BASE_ORGANS = [Organ.NONE, Organ.CHLOROPLAST, Organ.OXIDIZER, Organ.REPRODUCTOR, Organ.EYE];
const LIMB_ORGANS = [Organ.NONE, Organ.MOUTH, Organ.ARMOUR, Organ.FIN, Organ.SPINE];

const primitiveOrgans: Organ[] = [
    Organ.EYE,
    Organ.CHLOROPLAST,
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
    Organ.FIN,
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
        let diff = 0;

        const otherOragans = genome.getOrgans();

        for (let i = 0; i < 16; i++) {
            if (this.organs[i] !== otherOragans[i]) {
                diff++;
            }

            if (diff > SIMILARITY_LIMIT) {
                return false;
            }
        }

        const other = genome.getProgram().getInstructions();
        const instructions = this.getProgram().getInstructions();

        if (other.length !== instructions.length) {
            return false;
        }

        i:
        for (let i = 0; i < other.length; i++) {
            if (diff > SIMILARITY_LIMIT) {
                return false;
            }

            const instruction1 = other[i];
            const instruction2 = instructions[i];

            if (instruction1.code !== instruction2.code) {
                diff++;
                continue;
            }

            const branches1 = instruction1.branches;
            const branches2 = instruction2.branches;

            const args1 = instruction1.args;
            const args2 = instruction2.args;

            for (let a = 0; a < args1.length; a++) {
                if (args1[a] !== args2[a]) {
                    diff++;
                    continue i;
                }
            }

            for (let b = 0; b < branches1.length; b++) {
                if (branches1[b] !== branches2[b]) {
                    diff++;
                    continue i;
                }
            }
        }

        return diff <= SIMILARITY_LIMIT;
    }

    getColor(): Color {
        return this.color;
    }

    getProgram(): Program {
        return this.program;
    }

    clone(parameters: SimulationParameters): Genome {
        let hasMutation = false;

        let color = this.color;
        const organs = this.organs.slice();
        const program = this.program.clone();

        if (parameters.mutationBaseOrgansRate >= randomInt(1, 100)) {
            hasMutation = true;
            organs[randomInt(0, 7)] = shuffle(BASE_ORGANS)[0];
        }

        if (parameters.mutationLimbOrgansRate >= randomInt(1, 100)) {
            hasMutation = true;
            organs[randomInt(8, 15)] = shuffle(LIMB_ORGANS)[0];
        }

        if (parameters.mutationProgramRate >= randomInt(1, 100)) {
            hasMutation = true;
            
            const instruction = program.get(randomInt(0, program.getLength() - 1));
            let handler = program.getHandler(instruction.code);

            switch (randomInt(0, 2)) {
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
            }
        }

        if (hasMutation) {
            color = new Color(
                this.color.getRed() + (Math.random() > 0.5 ? 1 : -1) * randomInt(0, 5),
                this.color.getGreen() + (Math.random() > 0.5 ? 1 : -1) * randomInt(0, 5),
                this.color.getBlue() + (Math.random() > 0.5 ? 1 : -1) * randomInt(0, 5)
            );
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