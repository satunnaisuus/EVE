import { Color } from "../../../common/color";
import { AbstractCell } from "../abstract-cell";
import { CellContext } from "../cell-context";
import { CellFactory } from "../cell-factory";
import { Direction, getOffset, randomDirection, rotateLeft, rotateRight } from "./organism/direction";
import { Genome } from "./organism/genome";
import { OrganicCell } from "./organic-cell";
import { OrganismAction } from "./organism/action";
import { SimulationParameters } from "../../simulation-parameters";
import { shuffle } from "../../../common/array-utils";
import { CellOrganism } from "../../types/cells";

const MAX_ENERGY = 255;

export class OrganismCell extends AbstractCell {
    private lifetime: number = 0;

    private lastAction: OrganismAction = null;

    private energyFromPhotosynthesis = 0;

    private energyFromChemosynthesis = 0;

    private energyFromOrganic = 0;

    private energyBuffer = 0;

    private childrenCount = 0;

    private stepCount = 0;

    private attackCount = 0;

    private programCounter = 0;

    constructor(
        private id: number,
        private genome: Genome,
        private energy: number,
        private direction: Direction
    ) {
        super();
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
        if (this.energy <= 0) {
            if (this.energyBuffer === 0) {
                context.replace((factory: CellFactory) => factory.createEmpty());
            } else {
                context.replace((factory: CellFactory) => factory.createOrganic(this.energyBuffer));
            }
            
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

    rotateLeft(): void {
        this.direction = rotateLeft(this.direction);
    }

    rotateRight(): void {
        this.direction = rotateRight(this.direction);
    }

    makeStep(context: CellContext): void {
        const offset = getOffset(this.direction);
        context.moveByOffest(offset[0], offset[1]);
        this.stepCount++;
    }

    divide(context: CellContext): void {
        for (const direction of shuffle(Object.keys(Direction))) {
            const offset = getOffset(Direction[direction as keyof typeof Direction]);
            if (context.getByOffest(offset[0], offset[1]).isEmpty()) {
                context.moveByOffest(offset[0], offset[1]);
                this.changeEnergy(Math.floor(this.energy / -2));
                if (this.energy > 0) {
                    context.replace((factory: CellFactory) => factory.createOrganism(this.genome.clone(), this.energy, randomDirection()));
                    this.childrenCount++;
                }
                
                return;
            }
        }

        context.replace((factory: CellFactory) => factory.createEmpty());
    }

    attact(context: CellContext): void {
        const offset = getOffset(this.direction);
        const victim = context.getByOffest(offset[0], offset[1]);

        if (victim instanceof OrganismCell) {
            victim.kill();
        }

        this.attackCount++;
    }

    eat(context: CellContext): void {
        const offset = getOffset(this.direction);
        const food = context.getByOffest(offset[0], offset[1]);

        if (food instanceof OrganicCell) {
            context.deleteByOffset(offset[0], offset[1]);
            context.moveByOffest(offset[0], offset[1]);
            this.changeEnergy(food.getEnergy());
            this.energyFromOrganic += food.getEnergy();
        }
    }

    photosynthesis(energy: number): void {
        this.energyFromPhotosynthesis += energy;
        this.changeEnergy(energy);
    }

    chemosynthesis(energy: number): void {
        this.energyFromChemosynthesis += energy;
        this.changeEnergy(energy);
    }

    changeEnergy(value: number) {
        this.energy += value;

        if (this.energy > MAX_ENERGY) {
            this.energy = MAX_ENERGY;
        } else if (this.energy < 0) {
            this.energy = 0;
        }
    }

    kill() {
        if (this.energy === 0) {
            return;
        }

        this.energyBuffer = this.energy;
        this.energy = 0;
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

    getEnergyFromOrganic(): number {
        return this.energyFromOrganic;
    }

    getEnergyFromPhotosynthesis(): number {
        return this.energyFromPhotosynthesis;
    }

    getEnergyFromChemosynthesis(): number {
        return this.energyFromChemosynthesis;
    }

    getChildrenCount(): number {
        return this.childrenCount;
    }

    getAttackCount(): number {
        return this.attackCount;
    }

    getStepCount(): number {
        return this.stepCount;
    }

    getLastAction(): OrganismAction {
        return this.lastAction;
    }

    getProgramCounter(): number {
        return this.programCounter;
    }

    setProgramCounter(value: number): void {
        if (this.genome.getProgram().getLength() > value) {
            this.programCounter = value;
        } else {
            this.programCounter = 0;
        }
    }

    addProgramCounterRelative(value: number): void {
        this.programCounter += value;

        const length = this.genome.getProgram().getLength();

        if (this.programCounter >= length) {
            this.programCounter -= length;
        }
    }

    getArgument(n: number): number {
        return this.getGenome().getProgram().get(1 + n + this.programCounter);
    }

    getInstruction(): number {
        return this.getGenome().getProgram().get(this.programCounter);
    }
    
    serialize(): CellOrganism {
        return {
            id: this.id,
            type: 'organism',
            lifetime: this.lifetime,
            energy: this.energy,
            direction: this.direction,
            genome: this.genome.serialize(),
        }
    }
}