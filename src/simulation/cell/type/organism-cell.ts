import { Color } from "../../../common/color";
import { AbstractCell, CellType } from "../abstract-cell";
import { CellContext } from "../cell-context";
import { Direction, directionsList, randomDirection } from "./organism/direction";
import { shuffle } from "../../../common/array-utils";
import { Cell } from "../../types/cells";
import { Command, MAX_ARG_VALUE } from "./organism/interpreter";
import { randomInt } from "../../../common/random";

export const MAX_ENERGY = 255;
export const ORGANS_COUNT = 16;

export const GENOME_VERSION = 2;

const SIMILARITY_LIMIT = 1;

export enum Organ {
    NONE = 0,
    CHLOROPLAST = 1,
    OXIDIZER = 2,
    EYE = 3,
    REPRODUCTOR = 4,
    FERMENTER = 5,
    MOUTH = 6,
    ARMOUR = 7,
    FIN = 8,
    SPINE = 9,
}

export function createPrimitiveProgram(size: number): Uint8Array {
    const program: number[] = [
        Command.SENSE, 55, 3,
        Command.ACTION, 16, 0,
        Command.GOTO, 0, 4,
        Command.ACTION, 64, 0,
        Command.SENSE, 2, 6,
        Command.GOTO, 0, 0,
        Command.ACTION, 128, 0,
    ];

    for (let i = program.length / 3; i < size; i++) {
        program.push(Command.NOTHING, 0, 0);
    }

    return new Uint8Array(program);
}

const BASE_ORGANS = [Organ.NONE, Organ.CHLOROPLAST, Organ.OXIDIZER, Organ.REPRODUCTOR, Organ.EYE, Organ.FERMENTER];
const LIMB_ORGANS = [Organ.NONE, Organ.MOUTH, Organ.ARMOUR, Organ.FIN, Organ.SPINE];

export class OrganismCell extends AbstractCell {
    private programCounter = 0;

    private instructionsCount: number;

    private oxidizersCount = 0;

    private chloroplastsCount = 0;

    private mouthsCount = 0;

    private fermentersCount = 0;

    constructor(
        private id: number,
        private organs: Organ[],
        private color: Color,
        private program: Uint8Array,
        private energy: number,
        private direction: Direction,
        private supplyColor: Color,
        private lifetime: number = 0,
    ) {
        super();

        this.instructionsCount = program.length / 3;

        for (const organ of organs) {
            switch (organ) {
                case Organ.CHLOROPLAST:
                    this.chloroplastsCount++;
                    break;
                
                case Organ.OXIDIZER:
                    this.oxidizersCount++;
                    break;

                case Organ.FERMENTER:
                    this.fermentersCount++;
                    break;

                case Organ.MOUTH:
                    this.mouthsCount++;
                    break;
            }
        }
    }

    getId(): number {
        return this.id;
    }

    getType(): CellType {
        return CellType.ORGANISM;
    }

    getLifetime(): number {
        return this.lifetime;
    }

    getEnergy(): number {
        return this.energy;
    }

    getDirection(): Direction {
        return this.direction;
    }

    update(context: CellContext): void {
        if (this.energy > 0) {
            context.getInterpreter().execute(this, context);
            this.changeEnergy(- context.getSimulationParameters().stepCost);
        }

        if (this.energy === 0) {
            context.replace(context.getCellFactory().createEmpty());
            return;
        }

        if (this.lifetime >= context.getSimulationParameters().organismMaxLifetime) {
            context.replace(context.getCellFactory().createOrganic(this.energy));
            return;
        }

        this.lifetime++;
    }

    setDirection(direction: Direction): void {
        this.direction = direction;
    }

    divide(context: CellContext): void {
        if (this.energy === 0) {
            return;
        }

        const factory = context.getCellFactory();
        const parameters = context.getSimulationParameters();
        const interpreter = context.getInterpreter();

        let emptyDirection = null;

        for (const direction of shuffle(directionsList)) {
            if (context.getByDirection(direction).isEmpty()) {
                emptyDirection = direction;
                break;
            }
        }

        if (emptyDirection === null) {
            context.replace(factory.createOrganic(this.energy));
            return;
        }

        this.changeEnergy(Math.floor(this.energy / -2));

        let hasMutation = false;

        let color = this.color;
        let organs = this.organs;
        let program = this.program;

        const randomNumber = randomInt(1, 100);

        if (parameters.mutationBaseOrgansRate >= randomNumber) {
            hasMutation = true;
            organs = organs.slice();
            organs[randomInt(0, 7)] = BASE_ORGANS[randomInt(0, BASE_ORGANS.length - 1)];
        }

        if (parameters.mutationLimbOrgansRate >= randomNumber) {
            hasMutation = true;
            organs = organs.slice();
            organs[randomInt(8, 15)] = LIMB_ORGANS[randomInt(0, LIMB_ORGANS.length - 1)];
        }

        if (parameters.mutationProgramRate >= randomNumber) {
            hasMutation = true;
            
            program = new Uint8Array(program);
            const indexCommand = randomInt(0, this.instructionsCount - 1) * 3;
            const indexArgument = indexCommand + 1;
            const indexGoto = indexCommand + 2;

            let handler = interpreter.getHandler(program[indexCommand]);

            switch (randomInt(0, 2)) {
                case 0:
                    program[indexCommand] = randomInt(0, interpreter.getHandlersCount() - 1);
                    handler = interpreter.getHandler(program[indexCommand]);

                    if (handler.hasArgument()) {
                        if (program[indexArgument] === 0) {
                            program[indexArgument] = randomInt(0, MAX_ARG_VALUE);
                        }
                    } else {
                        program[indexArgument] = 0;
                    }

                    if (handler.hasGoto()) {
                        if (program[indexGoto] === 0) {
                            program[indexGoto] = randomInt(0, this.instructionsCount - 1);
                        }
                    } else {
                        program[indexGoto] = 0;
                    }
    
                    break;
                
                case 1:
                    if (handler.hasArgument()) {
                        program[indexArgument] = randomInt(0, MAX_ARG_VALUE);
                    }
                    break;
    
                case 2:
                    if (handler.hasGoto()) {
                        program[indexGoto] = randomInt(0, this.instructionsCount - 1);
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

        context.replaceByDirection(
            emptyDirection,
            factory.createOrganism(
                organs,
                color,
                program,
                this.energy,
                randomDirection(),
                this.supplyColor
            )
        );
    }

    changeEnergy(value: number): number {
        const oldValue = this.energy;

        this.energy += Math.round(value);

        if (this.energy > MAX_ENERGY) {
            this.energy = MAX_ENERGY;
        } else if (this.energy < 0) {
            this.energy = 0;
        }

        return this.energy - oldValue;
    }

    isStatic(): boolean {
        return false;
    }

    getColor(): Color {
        return this.color;
    }

    getProgramCounter(): number {
        return this.programCounter;
    }

    setProgramCounter(value: number): void {
        if (this.instructionsCount > value) {
            this.programCounter = value;
        } else {
            this.programCounter = 0;
        }
    }

    addProgramCounterRelative(value: number): void {
        this.setProgramCounter(this.programCounter + value);
    }

    getSupplyColor(): Color {
        return this.supplyColor;
    }

    getOrgan(id: number): Organ {
        return this.organs[id];
    }

    getChloroplastsCount(): number {
        return this.chloroplastsCount;
    }

    getOxidizersCount(): number {
        return this.oxidizersCount;
    }

    getMouthsCount(): number {
        return this.mouthsCount;
    }

    getFermentersCount(): number {
        return this.fermentersCount;
    }

    makeMoreRed(energy: number): void {
        this.supplyColor = new Color(
            this.supplyColor.getRed() + energy,
            this.supplyColor.getGreen() - energy,
            this.supplyColor.getBlue() - energy
        );
    }

    makeMoreGreen(energy: number): void {
        this.supplyColor = new Color(
            this.supplyColor.getRed() - energy,
            this.supplyColor.getGreen() + energy,
            this.supplyColor.getBlue() - energy
        );
    }

    makeMoreBlue(energy: number): void {
        this.supplyColor = new Color(
            this.supplyColor.getRed() - energy,
            this.supplyColor.getGreen() - energy,
            this.supplyColor.getBlue() + energy
        );
    }

    getOrgans(): Organ[] {
        return this.organs;
    }

    getProgram(): Uint8Array {
        return this.program;
    }

    getCommand(): Command {
        return this.program[this.programCounter * 3];
    }

    getArgument(): number {
        return this.program[this.programCounter * 3 + 1];
    }

    getGoto(): number {
        return this.program[this.programCounter * 3 + 2];
    }

    isSimilar(organism: OrganismCell): boolean {
        let diff = 0;

        const otherOragans = organism.getOrgans();

        for (let i = 0; i < 16; i++) {
            if (this.organs[i] !== otherOragans[i]) {
                diff++;
            }

            if (diff > SIMILARITY_LIMIT) {
                return false;
            }
        }

        const other = organism.getProgram();
        const instructions = this.program;

        if (other.length !== instructions.length) {
            return false;
        }

        for (let i = 0; i < other.length; i++) {
            if (diff > SIMILARITY_LIMIT) {
                return false;
            }

            if (other[i] !== instructions[i]) {
                diff++;
            }
        }

        return diff <= SIMILARITY_LIMIT;
    }
    
    serialize(): Cell {
        const program = [];

        for (const item of this.program) {
            program.push(item);
        }

        return {
            id: this.id,
            type: CellType.ORGANISM,
            lifetime: this.lifetime,
            energy: this.energy,
            direction: this.direction,
            genome: {
                organs: this.organs,
                color: this.color.toHexFormat(),
                program: program,
                version: GENOME_VERSION,
            },
            programCounter: this.programCounter,
            supplyColor: this.supplyColor.toHexFormat(),
        }
    }
}