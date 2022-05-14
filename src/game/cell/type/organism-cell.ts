import { Color } from "../../../common/color";
import { AbstractCell } from "../abstract-cell";
import { CellContext } from "../cell-context";
import { CellFactory } from "../cell-factory";
import { CellVisitor } from "../cell-visitor";
import { Direction, getOffset, randomDirection, rotateLeft, rotateRight } from "./organism/direction";
import { Genome } from "./organism/genome";
import { MeatCell } from "./meat-cell";
import { OrganismAction } from "./organism/action";
import { PlantCell } from "./plant-cell";

const MAX_LIFETIME = 150;
const ENERGY_MEAT = 20;
const ENERGY_PLANT = 20;
const ENERGY_PHOTOSYNTHHESIS = 2;

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

    visit(visitor: CellVisitor): void {
        visitor.visitOrganism(this);
    }

    update(context: CellContext): void {
        if (this.lifetime > MAX_LIFETIME || this.energy <= 0) {
            context.replace((factory: CellFactory) => factory.createMeat());
            return;
        }

        const offsetByDirection = getOffset(this.direction);
        const cell = context.getByOffest(...offsetByDirection);
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
            this.photosynthesis();
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
        context.moveByOffest(...getOffset(this.direction));
        this.changeEnergy(-1);
    }

    divide(context: CellContext): void {
        for (const direction in Direction) {
            const offset = getOffset(Direction[direction as keyof typeof Direction]);
            if (context.getByOffest(offset[0], offset[1]).isEmpty()) {
                context.moveByOffest(...offset);
                this.changeEnergy(Math.floor(this.energy / -2));
                context.replace((factory: CellFactory) => factory.createOrganism(this.color, this.genome.clone(), this.energy));
                return;
            }
        }
    }

    attact(context: CellContext): void {
        const offset = getOffset(this.direction);
        const victim = context.getByOffest(...offset);
        const self = this;

        victim.visit(new class extends CellVisitor {
            visitOrganism(victim: OrganismCell): void {
                if (victim.getEnergy() <= self.getEnergy()) {
                    victim.changeEnergy(self.getEnergy() / -3);
                } 
                
                self.changeEnergy(-1);
            }
        });
    }

    eat(context: CellContext): void {
        const offset = getOffset(this.direction);
        const food = context.getByOffest(...offset);

        const eat = (energy: number) => {
            context.deleteByOffset(...offset);
            context.moveByOffest(...offset);
            this.changeEnergy(energy);
        }

        food.visit(new class extends CellVisitor {
            visitMeat(cell: MeatCell): void {
                eat(ENERGY_MEAT);
            }

            visitPlant(cell: PlantCell): void {
                eat(ENERGY_PLANT);
            }
        });
    }

    photosynthesis(): void {
        this.changeEnergy(ENERGY_PHOTOSYNTHHESIS);
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
}