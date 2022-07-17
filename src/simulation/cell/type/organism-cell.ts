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

const MAX_ENERGY = 255;
const DIVIDE_ENERGY_COAST = 5;

export class OrganismCell extends AbstractCell {
    private lifetime: number = 0;

    private direction: Direction;

    private lastAction: OrganismAction;

    private energyFromPhotosynthesis = 0;

    private energyFromChemosynthesis = 0;

    private energyFromOrganic = 0;

    private energyBuffer = 0;

    constructor(
        private id: number,
        private genome: Genome,
        private energy: number
    ) {
        super();
        this.direction = randomDirection();
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

        const offsetByDirection = getOffset(this.direction);
        const cell = context.getByOffest(offsetByDirection[0], offsetByDirection[1]);
        const action = this.genome.getAction(this, cell);

        if (action === OrganismAction.STEP) {
            this.makeStep(context);
        } else if (action === OrganismAction.ROTATE_LEFT) {
            this.rotateLeft();
        } else if (action === OrganismAction.ROTATE_RIGHT) {
            this.rotateRight();
        } else if (action === OrganismAction.DIVIDE) {
            this.divide(context);
        } else if (action === OrganismAction.ATTACK) {
            this.attact(context);
        } else if (action === OrganismAction.EAT) {
            this.eat(context);
        } else if (action === OrganismAction.PHOTOSYNTHESIS) {
            this.photosynthesis(parameters.photosynthesisEnergy);
        } else if (action === OrganismAction.CHEMOSYNTHESIS) {
            this.chemosynthesis(parameters.chemosynthesisEnergy);
        }

        this.lastAction = action;
        this.lifetime++;
    }

    rotateLeft(): void {
        this.direction = rotateLeft(this.direction);
        this.changeEnergy(-1);
    }

    rotateRight(): void {
        this.direction = rotateRight(this.direction);
        this.changeEnergy(-1);
    }

    makeStep(context: CellContext): void {
        const offset = getOffset(this.direction);
        context.moveByOffest(offset[0], offset[1]);
        this.changeEnergy(-1);
    }

    divide(context: CellContext): void {
        this.changeEnergy(- DIVIDE_ENERGY_COAST);

        for (const direction of shuffle(Object.keys(Direction))) {
            const offset = getOffset(Direction[direction as keyof typeof Direction]);
            if (context.getByOffest(offset[0], offset[1]).isEmpty()) {
                context.moveByOffest(offset[0], offset[1]);
                this.changeEnergy(Math.floor(this.energy / -2));
                if (this.energy > 0) {
                    context.replace((factory: CellFactory) => factory.createOrganism(this.genome.clone(), this.energy));
                }
                
                return;
            }
        }

        if (this.energy > 50) {
            context.replace((factory: CellFactory) => factory.createOrganism(this.genome.clone(), this.energy));
        } else {
            this.energy = 0;
        }
    }

    attact(context: CellContext): void {
        const offset = getOffset(this.direction);
        const victim = context.getByOffest(offset[0], offset[1]);

        if (victim instanceof OrganismCell) {
            victim.kill();
        }

        this.changeEnergy(-1);
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

        this.changeEnergy(-1);
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
    
    serialize() {
        return {
            id: this.id,
            type: 'organism',
            lifetime: this.lifetime,
            energy: this.energy,
            color: this.getColor().toHexFormat(),
            direction: this.direction.toString(),
            lastAction: this.lastAction,
        }
    }
}