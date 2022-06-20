import { Color } from "../../../common/color";
import { AbstractCell } from "../abstract-cell";
import { CellContext } from "../cell-context";
import { CellFactory } from "../cell-factory";
import { Direction, getOffset, randomDirection, rotateLeft, rotateRight } from "./organism/direction";
import { Genome } from "./organism/genome";
import { OrganicCell } from "./organic-cell";
import { OrganismAction } from "./organism/action";
import { SimulationParameters } from "../../simulation-parameters";
import { WallCell } from "./wall-cell";
import { EmptyCell } from "./empty-cell";

export class OrganismCell extends AbstractCell {
    private lifetime: number = 0;

    private direction: Direction;

    constructor(
        private color: Color,
        private genome: Genome,
        private energy: number
    ) {
        super();
        this.direction = randomDirection();
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
        if (parameters.organismMaxLifetime !== 0 && this.lifetime > parameters.organismMaxLifetime || this.energy <= 0) {
            context.replace((factory: CellFactory) => factory.createOrganic());
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
            this.eat(context, parameters);
        } else if (action === OrganismAction.PHOTOSYNTHESIS) {
            this.photosynthesis(parameters.photosynthesisEnergy);
        }

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
        for (const direction in Direction) {
            const offset = getOffset(Direction[direction as keyof typeof Direction]);
            if (context.getByOffest(offset[0], offset[1]).isEmpty()) {
                context.moveByOffest(offset[0], offset[1]);
                this.changeEnergy(Math.floor(this.energy / -2));
                context.replace((factory: CellFactory) => factory.createOrganism(this.color, this.genome.clone(), this.energy));
                return;
            }
        }
    }

    attact(context: CellContext): void {
        const offset = getOffset(this.direction);
        const victim = context.getByOffest(offset[0], offset[1]);

        if (victim instanceof OrganismCell) {
            if (victim.getEnergy() <= this.getEnergy()) {
                victim.changeEnergy(this.getEnergy() / -3);
            } 
            
            this.changeEnergy(-1);
        }
    }

    eat(context: CellContext, parameters: SimulationParameters): void {
        const offset = getOffset(this.direction);
        const food = context.getByOffest(offset[0], offset[1]);

        if (food instanceof OrganicCell) {
            context.deleteByOffset(offset[0], offset[1]);
            context.moveByOffest(offset[0], offset[1]);
            this.changeEnergy(parameters.organicEnergy);
        }
    }

    photosynthesis(energy: number): void {
        this.changeEnergy(energy);
    }

    changeEnergy(value: number) {
        this.energy += value;

        if (this.energy > 100) {
            this.energy = 100;
        } else if (this.energy < 0) {
            this.energy = 0;
        }
    }

    kill() {
        this.energy = 0;
    }

    isStatic(): boolean {
        return false;
    }

    isSimilar(cell: OrganismCell): boolean {
        // return this.genome.isSimilar(cell.getGenome());
        return this.color.equals(cell.getColor());
    }

    getColor(): Color {
        return this.color;
    }
    
    serialize() {
        return {
            type: 'organism',
            lifetime: this.lifetime,
            energy: this.energy,
            color: this.color.toHexFormat(),
            direction: this.direction.toString(),
        }
    }
}