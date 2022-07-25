import { CellContext } from "../../cell-context";
import { OrganismCell } from "../organism-cell";
import { AbstractInstruction, TargetType } from "./abstract-instruction";
import { AttactInstruction } from "./instruction/attact-instruction";
import { ChemosynthesisInstruction } from "./instruction/chemosynthesis-instruction";
import { DivideInstruction } from "./instruction/divide-instruction";
import { EatInstruction } from "./instruction/eat-instruction";
import { IfInstruction } from "./instruction/if-instruction";
import { NothingInstruction } from "./instruction/nothing-instruction";
import { PhotosynthesisInstruction } from "./instruction/photosynthesis-instruction";
import { RotateLeftInstruction } from "./instruction/rotate-left-instruction";
import { RotateRightInstruction } from "./instruction/rotate-right-instruction";
import { StepInstruction } from "./instruction/step-instruction";

const INSTRUCTIONS_PER_STEP_LIMIT = 16;

const CMD_NOTHING = 0;
const CMD_ROTATE_LEFT = 1;
const CMD_ROTATE_RIGHT = 2;
const CMD_STEP = 3;
const CMD_EAT = 4;
const CMD_ATTACK = 5;
const CMD_DIVIDE = 6;
const CMD_PHOTOSYNTHESIS = 7;
const CMD_CHEMOSYNTHESIS = 8;
const CMD_IS_EMPTY = 9;
const CMD_IS_ORGANIC = 10;
const CMD_IS_WALL = 11;
const CMD_IS_ORGANISM_SIMILAR = 12;
const CMD_IS_ORGANISM_OTHER = 13;

const instructions: {[key: number]: AbstractInstruction} = {
    [CMD_NOTHING]: new NothingInstruction(),
    [CMD_ROTATE_LEFT]: new RotateLeftInstruction(),
    [CMD_ROTATE_RIGHT]: new RotateRightInstruction(),
    [CMD_STEP]: new StepInstruction(),
    [CMD_EAT]: new EatInstruction(),
    [CMD_ATTACK]: new AttactInstruction(),
    [CMD_DIVIDE]: new DivideInstruction(),
    [CMD_PHOTOSYNTHESIS]: new PhotosynthesisInstruction(),
    [CMD_CHEMOSYNTHESIS]: new ChemosynthesisInstruction(),
    [CMD_IS_EMPTY]: new IfInstruction(TargetType.EMPTY),
    [CMD_IS_ORGANIC]: new IfInstruction(TargetType.ORGANIC),
    [CMD_IS_WALL]: new IfInstruction(TargetType.WALL),
    [CMD_IS_ORGANISM_SIMILAR]: new IfInstruction(TargetType.ORGANISM_SIMILAR),
    [CMD_IS_ORGANISM_OTHER]: new IfInstruction(TargetType.ORGANISM_OTHER),
}

export class Program {
    private length: number;

    constructor(private instructions: number[]) {
        this.length = instructions.length;
    }

    static createPrimitive(size: number): Program {
        const instructions = [];

        for (let i = 0; i < size; i++) {
            instructions.push(CMD_PHOTOSYNTHESIS);
        }

        return new Program(instructions);
    }

    execute(organism: OrganismCell, context: CellContext): void {
        for (let i = 0; i < INSTRUCTIONS_PER_STEP_LIMIT; i++) {
            const instruction = instructions[organism.getInstruction()];

            if (instruction === undefined) {
                organism.addProgramCounterRelative(organism.getInstruction());
                continue;
            }

            if (instruction.execute(organism, context)) {
                break;
            }
        }
    }

    getInstructions(): number[] {
        return this.instructions;
    }

    get(i: number): number {
        return this.instructions[i];
    }

    getLength(): number {
        return this.length;
    }
}