import { Color } from "../../../common/color";
import { AbstractCell } from "../abstract-cell";
import { CellContext } from "../cell-context";
import { CellFactory } from "../cell-factory";
import { Direction, directionsList, getOffset, randomDirection, rotateOnOffset } from "./organism/direction";
import { Genome, Organ } from "./organism/genome";
import { SimulationParameters } from "../../simulation-parameters";
import { shuffle } from "../../../common/array-utils";
import { CellOrganism } from "../../types/cells";
import { AbstractOrgan } from "./organism/abstract-organ";
import { Armour } from "./organism/organ/armour";
import { Spine } from "./organism/organ/spine";
import { Eye } from "./organism/organ/eye";
import { Chloroplast } from "./organism/organ/chloroplast";
import { Oxidizer } from "./organism/organ/oxidizer";
import { Fin } from "./organism/organ/fin";
import { Mouth } from "./organism/organ/mouth";

export const MAX_ENERGY = 255;
export const ORGANS_COUNT = 16;

export class OrganismCell extends AbstractCell {
    private lifetime = 0;

    private programCounter = 0;

    private organs: AbstractOrgan[] = [];

    private oxidizersCount = 0;

    private chloroplastsCount = 0;

    constructor(
        private id: number,
        private genome: Genome,
        private energy: number,
        private direction: Direction,
        private supplyColor: Color
    ) {
        super();

        for (const [i, organ] of genome.getOrgans().entries()) {
            switch (organ) {
                case Organ.EYE:
                    this.organs.push(new Eye(this, i));
                    break;
                
                case Organ.CHLOROPLAST:
                    this.organs.push(new Chloroplast(this, i));
                    this.chloroplastsCount++;
                    break;
                
                case Organ.OXIDIZER:
                    this.organs.push(new Oxidizer(this, i));
                    this.oxidizersCount++;
                    break;

                case Organ.ARMOUR:
                    this.organs.push(new Armour(this, i));
                    break;
                
                case Organ.SPINE:
                    this.organs.push(new Spine(this, i));
                    break;
                
                case Organ.FIN:
                    this.organs.push(new Fin(this, i));
                    break;
                
                case Organ.MOUTH:
                    this.organs.push(new Mouth(this, i));
                    break;
            }
        }
    }

    getId(): number {
        return this.id;
    }

    getType(): string {
        return 'organism';
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

    getGenome(): Genome {
        return this.genome;
    }

    update(context: CellContext, parameters: SimulationParameters): void {
        if (this.energy === 0) {
            context.replace((factory: CellFactory) => factory.createEmpty());
            return;
        }

        if (this.lifetime >= parameters.organismMaxLifetime) {
            context.replace((factory: CellFactory) => factory.createOrganic(this.energy));
            return;
        }

        this.genome.getProgram().execute(this, context);
        this.changeEnergy(-1);
        this.lifetime++;

        if (this.energy >= this.genome.getDivideEnergyLimit()) {
            this.divide(context);
        }
    }

    setDirection(direction: Direction): void {
        this.direction = direction;
    }

    divide(context: CellContext): void {
        for (const direction of shuffle(directionsList())) {
            const offset = getOffset(direction);
            if (context.getByOffest(offset[0], offset[1]).isEmpty()) {
                context.moveByOffest(offset[0], offset[1]);
                this.changeEnergy(Math.floor(this.energy / -2));
                
                if (this.energy > 0) {
                    context.replace((factory: CellFactory) => {
                        return factory.createOrganism(
                            this.genome.clone(context.getSimulationParameters().mutationChance),
                            this.energy,
                            randomDirection(),
                            this.supplyColor
                        );
                    });
                }
                
                return;
            }
        }

        context.replace((factory: CellFactory) => factory.createEmpty());
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

    isSimilar(cell: OrganismCell): boolean {
        return this.genome.isSimilar(cell.getGenome());
    }

    getColor(): Color {
        return this.genome.getColor();
    }

    getProgramCounter(): number {
        return this.programCounter;
    }

    setProgramCounter(value: number): void {
        if (this.genome.getProgramLength() > value) {
            this.programCounter = value;
        } else {
            this.programCounter = 0;
        }
    }

    addProgramCounterRelative(value: number): void {
        this.setProgramCounter(this.programCounter += value);
    }

    getSupplyColor(): Color {
        return this.supplyColor;
    }

    getOrgan(id: number): AbstractOrgan {
        return this.organs[id];
    }

    getChloroplastsCount(): number {
        return this.chloroplastsCount;
    }

    getOxidizersCount(): number {
        return this.oxidizersCount;
    }

    onAttack(power: number, enemy: OrganismCell, direction: Direction): number {
        if (this.energy === 0) {
            return 0;
        }

        const limb = this.organs[8 + rotateOnOffset(this.direction, direction)];

        if (limb === null) {
            return this.changeEnergy(- power);
        }

        if (limb instanceof Armour) {
            return limb.onAttack(power);
        }

        if (limb instanceof Spine) {
            return limb.onAttack(power, enemy);
        }

        return 0;
    }

    makeMoreRed(): void {
        this.supplyColor = new Color(
            this.supplyColor.getRed() + 50,
            this.supplyColor.getGreen() - 50,
            this.supplyColor.getBlue() - 50
        );
    }

    makeMoreGreen(): void {
        this.supplyColor = new Color(
            this.supplyColor.getRed() - 50,
            this.supplyColor.getGreen() + 50,
            this.supplyColor.getBlue() - 50
        );
    }

    makeMoreBlue(): void {
        this.supplyColor = new Color(
            this.supplyColor.getRed() - 50,
            this.supplyColor.getGreen() - 50,
            this.supplyColor.getBlue() + 50
        );
    }
    
    serialize(): CellOrganism {
        return {
            id: this.id,
            type: 'organism',
            lifetime: this.lifetime,
            energy: this.energy,
            direction: this.direction,
            genome: this.genome.serialize(),
            programCounter: this.programCounter,
        }
    }
}