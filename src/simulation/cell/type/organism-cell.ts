import { Color } from "../../../common/color";
import { AbstractCell, CellType } from "../abstract-cell";
import { CellContext } from "../cell-context";
import { CellFactory } from "../cell-factory";
import { Direction, directionsList, getOffset, randomDirection, rotateOnOffset } from "./organism/direction";
import { Genome, Organ } from "./organism/genome";
import { SimulationParameters } from "../../simulation-parameters";
import { shuffle } from "../../../common/array-utils";
import { AbstractOrgan } from "./organism/abstract-organ";
import { Armour } from "./organism/organ/armour";
import { Spine } from "./organism/organ/spine";
import { Eye } from "./organism/organ/eye";
import { Chloroplast } from "./organism/organ/chloroplast";
import { Oxidizer } from "./organism/organ/oxidizer";
import { Fin } from "./organism/organ/fin";
import { Mouth } from "./organism/organ/mouth";
import { Cell } from "../../types/cells";
import { Reproductor } from "./organism/organ/reproductor";

export const MAX_ENERGY = 255;
export const ORGANS_COUNT = 16;

const DIVIDE_COST = 20;
const STEP_COST = 1;

export class OrganismCell extends AbstractCell {
    private programCounter = 0;

    private organs: AbstractOrgan[] = [];

    private oxidizersCount = 0;

    private chloroplastsCount = 0;

    private mouthsCount = 0;

    constructor(
        private id: number,
        private genome: Genome,
        private energy: number,
        private direction: Direction,
        private supplyColor: Color,
        private lifetime: number = 0,
    ) {
        super();

        for (const [i, organ] of genome.getOrgans().entries()) {
            switch (organ) {
                case Organ.NONE:
                    this.organs.push(null);
                    break;

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

                case Organ.REPRODUCTOR:
                    this.organs.push(new Reproductor(this, i));
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

    getGenome(): Genome {
        return this.genome;
    }

    update(context: CellContext, parameters: SimulationParameters): void {
        if (this.energy === 0) {
            return;
        }

        this.genome.getProgram().execute(this, context);
        
        this.changeEnergy(- STEP_COST);

        if (this.energy === 0) {
            context.replace((factory: CellFactory) => factory.createEmpty());
            return;
        }

        if (this.lifetime >= parameters.organismMaxLifetime) {
            context.replace((factory: CellFactory) => factory.createOrganic(this.energy));
            return;
        }

        this.lifetime++;
    }

    setDirection(direction: Direction): void {
        this.direction = direction;
    }

    divide(context: CellContext): void {
        this.changeEnergy(- DIVIDE_COST);

        if (this.energy > 0) {
            for (const direction of shuffle(directionsList())) {
                const offset = getOffset(direction);
                if (context.getByOffest(offset[0], offset[1]).isEmpty()) {
                    context.moveByOffest(offset[0], offset[1]);
                    this.changeEnergy(Math.floor(this.energy / -2));
                    
                    if (this.energy > 0) {
                        context.replace((factory: CellFactory) => {
                            return factory.createOrganism(
                                this.genome.clone(context.getSimulationParameters()),
                                this.energy,
                                randomDirection(),
                                this.supplyColor
                            );
                        });
                    
                        return;
                    }
                }
            }
        }

        context.replace((factory: CellFactory) => {
            if (this.energy === 0) {
                return factory.createEmpty();
            } else {
                return factory.createOrganic(this.energy)
            }
        });
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

    getMouthsCount(): number {
        return this.mouthsCount;
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
    
    serialize(): Cell {
        return {
            id: this.id,
            type: CellType.ORGANISM,
            lifetime: this.lifetime,
            energy: this.energy,
            direction: this.direction,
            genome: this.genome.serialize(),
            programCounter: this.programCounter,
            supplyColor: this.supplyColor.toHexFormat(),
        }
    }
}