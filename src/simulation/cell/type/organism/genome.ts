import { randomInt } from "../../../../common/random";
import { Color } from "../../../../common/color";
import { Program } from "./program";

const SIMILARITY_LIMIT = 1;

export class Genome {
    constructor(
        private program: Program,
        private color: Color,
        private divideLimit: number,
    ) {
        
    }

    isSimilar(genome: Genome): boolean {
        const otherInstructions = genome.getProgram().getInstructions();
        const selfInstructions = this.getProgram().getInstructions();
        
        let differences = 0;

        for (let i = 0; i < selfInstructions.length; i++) {
            if (selfInstructions[i] !== otherInstructions[i]) {
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

        const instructions = this.program.getInstructions().slice();

        instructions[randomInt(0, instructions.length - 1)] = randomInt(0, instructions.length - 1);

        const color = new Color(
            this.color.getRed() + (Math.random() > 0.5 ? 1 : -1) * randomInt(0, 5),
            this.color.getGreen() + (Math.random() > 0.5 ? 1 : -1) * randomInt(0, 5),
            this.color.getBlue() + (Math.random() > 0.5 ? 1 : -1) * randomInt(0, 5)
        );

        return new Genome(new Program(instructions), color, divideLimit);
    }

    getDivideEnergyLimit(): number {
        return this.divideLimit;
    }

    serialize() {
        return {
            color: this.color.toHexFormat(),
            program: this.program.getInstructions(),
            divideLimit: this.divideLimit,
        };
    }

    static createRandom(): Genome {
        return new Genome(Program.createPrimitive(64), Color.random(), randomInt(100, 255));
    }
}