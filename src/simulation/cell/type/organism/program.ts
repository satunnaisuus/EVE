import { CellContext } from "../../cell-context";
import { OrganismCell } from "../organism-cell";
import { AbstractInstruction } from "./abstract-instruction";
import { ActionInstruction } from "./instruction/action-instruction";
import { SenseInstruction } from "./instruction/sense-instruction";
import { JumpInstruction } from "./instruction/jump-instruction";
import { NothingInstruction } from "./instruction/nothing-instruction";
import { EnergyGtInstruction } from "./instruction/energy-gt-instruction";
import { randomInt } from "../../../../common/random";

export enum Command {
    NOTHING = 0,
    JUMP = 1,
    SENSE = 2,
    ACTION = 3,
    ENERGY_GT = 4,
}

export interface InstructionConfig {
    code: Command;
    args: number[];
    branches: number[];
}

const INSTRUCTIONS_PER_STEP_LIMIT = 16;

const handlers: {[key: number]: AbstractInstruction} = {
    [Command.NOTHING]: new NothingInstruction(),
    [Command.JUMP]: new JumpInstruction(),
    [Command.SENSE]: new SenseInstruction(),
    [Command.ACTION]: new ActionInstruction(),
    [Command.ENERGY_GT]: new EnergyGtInstruction(),
}

export class Program {
    constructor(private instructions: InstructionConfig[]) {

    }

    static createPrimitive(size: number): Program {
        const instructions: InstructionConfig[] = [
            {
                code: Command.ENERGY_GT,
                args: [0.5],
                branches: [3],
            },
            {
                code: Command.ACTION,
                args: [0.1, 0],
                branches: [],
            },
            {
                code: Command.JUMP,
                args: [],
                branches: [0],
            },
            {
                code: Command.ACTION,
                args: [0.3, 0],
                branches: [],
            },
            {
                code: Command.SENSE,
                args: [0, 0.4],
                branches: [6],
            },
            {
                code: Command.JUMP,
                args: [],
                branches: [0],
            },
            {
                code: Command.ACTION,
                args: [0.5, 0],
                branches: [],
            },
        ];

        for (let i = instructions.length; i < size; i++) {
            instructions.push({
                code: Command.NOTHING,
                args: [],
                branches: [],
            });
        }

        return new Program(instructions);
    }

    execute(organism: OrganismCell, context: CellContext): void {
        for (let i = 0; i < INSTRUCTIONS_PER_STEP_LIMIT; i++) {
            const instruction = this.instructions[organism.getProgramCounter()];
            const instructionHandler = handlers[instruction.code];

            if (instructionHandler === undefined) {
                organism.addProgramCounterRelative(1);
                continue;
            }

            if (instructionHandler.execute(organism, context, instruction.args, instruction.branches)) {
                break;
            }
        }
    }

    getInstructions(): InstructionConfig[] {
        return this.instructions.slice();
    }

    addInstruction(index: number, instruction: InstructionConfig): void {
        if (index === this.getLength()) {
            this.instructions.push(instruction);
        } else {
            this.instructions.splice(index, 0, instruction);
        }

        for (let i = 0; i < this.getLength(); i++) {
            const branches = this.get(i).branches;

            for (let j = 0; j < branches.length; j++) {
                if (branches[j] >= index) {
                    branches[j] = branches[j] + 1;
                }
            }
        }
    }

    removeInstruction(index: number): void {
        this.instructions.splice(index, 1);

        for (let i = 0; i < this.getLength(); i++) {
            const branches = this.get(i).branches;

            for (let j = 0; j < branches.length; j++) {
                if (branches[j] >= index && branches[j] > 0) {
                    branches[j] = branches[j] - 1;
                }
            }
        }
    }

    get(i: number): InstructionConfig {
        return this.instructions[i];
    }

    getLength(): number {
        return this.instructions.length;
    }

    getHandlersCount(): number {
        return 5;
    }

    getHandler(code: number): AbstractInstruction {
        return handlers[code];
    }

    clone(): Program {
        return new Program(this.instructions.map(i => {
            return {
                code: i.code,
                args: i.args.slice(),
                branches: i.branches.slice(),
            };
        }));
    }

    serialize() {
        return this.instructions;
    }

    static createRandomInstruction(program: Program): InstructionConfig {
        const args = [];
        const branches = [];

        const code: Command = randomInt(0, program.getHandlersCount() - 1);
        const handler = handlers[code];

        for (let i = 0; i < handler.getArgsCount(); i++) {
            args.push(Math.random());
        }

        for (let i = 0; i < handler.getBranchesCount(); i++) {
            branches.push(randomInt(0, program.getLength() - 1));
        }

        return {
            code: code,
            args: args,
            branches: branches
        };
    }
}