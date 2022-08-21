import { CellContext } from "../../cell-context";
import { OrganismCell } from "../organism-cell";
import { AbstractInstruction } from "./abstract-instruction";
import { ActionInstruction } from "./instruction/action-instruction";
import { SenseInstruction } from "./instruction/sense-instruction";
import { GotoInstruction } from "./instruction/goto-instruction";
import { NothingInstruction } from "./instruction/nothing-instruction";

export enum Command {
    NOTHING = 0,
    GOTO = 1,
    SENSE = 2,
    ACTION = 3,
}

export const MAX_ARG_VALUE = 255;

const INSTRUCTIONS_PER_STEP_LIMIT = 16;

const handlers: {[key: number]: AbstractInstruction} = {
    [Command.NOTHING]: new NothingInstruction(),
    [Command.GOTO]: new GotoInstruction(),
    [Command.SENSE]: new SenseInstruction(),
    [Command.ACTION]: new ActionInstruction(),
}

const handlersCount = Object.keys(handlers).length;

export class Interpreter {
    execute(organism: OrganismCell, context: CellContext): void {
        for (let i = 0; i < INSTRUCTIONS_PER_STEP_LIMIT; i++) {
            const handler = handlers[organism.getCommand()];

            if (handler.execute(organism, context, organism.getArgument(), organism.getGoto())) {
                break;
            }
        }
    }

    getHandlersCount(): number {
        return handlersCount;
    }

    getHandler(code: number): AbstractInstruction {
        return handlers[code];
    }
}