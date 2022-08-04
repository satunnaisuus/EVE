import { randomInt } from "../../../../common/random";
import { Color } from "../../../../common/color";
import { Program } from "./program";

const SIMILARITY_LIMIT = 1;

export enum Organ {
    NONE = 0,
    CHLOROPLAST = 1,
    OXIDIZER = 2,
    EYE = 3,
    MOUTH = 4,
    ARMOUR = 5,
    FIN = 6,
    SPINE = 7,
}

const primitiveOrgans: Organ[] = [Organ.CHLOROPLAST].concat(Array(15).fill(null));

export class Genome {
    constructor(
        private program: Program,
        private color: Color,
        private divideLimit: number,
        private organs: Organ[],
    ) {
        
    }

    static createRandom(): Genome {
        return new Genome(
            Program.createPrimitive(16),
            Color.random(),
            randomInt(100, 255),
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

        let divideLimit = this.divideLimit;

        if (divideLimit === 255) {
            divideLimit--;
        } else if (divideLimit === 0) {
            divideLimit++;
        } else if (Math.random() > 0.5) {
            divideLimit++;
        } else {
            divideLimit--;
        }

        const color = new Color(
            this.color.getRed() + (Math.random() > 0.5 ? 1 : -1) * randomInt(0, 5),
            this.color.getGreen() + (Math.random() > 0.5 ? 1 : -1) * randomInt(0, 5),
            this.color.getBlue() + (Math.random() > 0.5 ? 1 : -1) * randomInt(0, 5)
        );

        const program = this.program.clone();
        const instruction = program.get(randomInt(0, program.getLength() - 1));
        const organs = this.organs.slice();

        switch (randomInt(0, 4)) {
            case 0:
                instruction.code = randomInt(0, program.getHandlersCount() - 1);
                const handler = program.getHandler(instruction.code);

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
                organs[randomInt(0, 7)] = randomInt(0, 3);
                break;
            
            case 4:
                const i = randomInt(0, 4);
                organs[randomInt(8, 15)] = i === 0 ? 0 : i + 3;
                break;

        }

        return new Genome(program, color, divideLimit, organs);
    }

    getDivideEnergyLimit(): number {
        return this.divideLimit;
    }

    getProgramLength(): number {
        return this.program.getLength();
    }

    getOrgans(): Organ[] {
        return this.organs;
    }

    serialize() {
        return {
            color: this.color.toHexFormat(),
            program: this.program.serialize(),
            divideLimit: this.divideLimit,
            organs: this.organs,
        };
    }
}