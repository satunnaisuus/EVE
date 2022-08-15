import { CellContext } from "../../cell-context";
import { OrganismCell } from "../organism-cell";
import { AbstractInstruction } from "./abstract-instruction";
import { ActionInstruction } from "./instruction/action-instruction";
import { SenseInstruction } from "./instruction/sense-instruction";
import { JumpInstruction } from "./instruction/jump-instruction";
import { NothingInstruction } from "./instruction/nothing-instruction";
import { EnergyGtInstruction } from "./instruction/energy-gt-instruction";

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
}