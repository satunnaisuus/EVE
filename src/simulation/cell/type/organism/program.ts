import { CellContext } from "../../cell-context";
import { OrganismCell } from "../organism-cell";
import { AbstractInstruction } from "./abstract-instruction";
import { ActionInstruction } from "./instruction/action-instruction";
import { IfInstruction } from "./instruction/if-instruction";
import { JumpInstruction } from "./instruction/jump-instruction";
import { NothingInstruction } from "./instruction/nothing-instruction";

export enum Command {
    NOTHING = 0,
    JUMP = 1,
    IF = 2,
    ACTION = 3,
}

export interface InstructionConfig {
    code: Command;
    args: number[];
    branches: number[];
}

const INSTRUCTIONS_PER_STEP_LIMIT = 8;

const handlers: {[key: number]: AbstractInstruction} = {
    [Command.NOTHING]: new NothingInstruction(),
    [Command.JUMP]: new JumpInstruction(),
    [Command.IF]: new IfInstruction(),
    [Command.ACTION]: new ActionInstruction(),
}

export class Program {
    constructor(private instructions: InstructionConfig[]) {

    }

    static createPrimitive(size: number): Program {
        const instructions: InstructionConfig[] = [];

        for (let i = 0; i < size; i++) {
            instructions.push({
                code: Command.ACTION,
                args: [0, 0],
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
        return 4;
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