import Color from "../common/color";
import { Cell } from "./cell";
import CellContext from "./cell-context";
import CellFactory from "./cell-factory";
import CellVisitor from "./cell-visitor";
import cellVisitor from "./cell-visitor";
import { Direction } from "./direction";
import Genome from "./genome";
import { MeatCell } from "./meat-cell";
import { OrganismAction } from "./organism-action";
import { PlantCell } from "./plant-cell";

const MAX_LIFETIME = 100;
const INITIAL_ENERGY = 70;
const ENERGY_MEAT = 20;
const ENERGY_PLANT = 20;

export class OrganismCell extends Cell {
    private lifetime: number = 0;

    private direction: Direction;

    constructor(
        private color: Color,
        private genome: Genome,
        private energy: number = INITIAL_ENERGY
    ) {
        super();
        this.direction = Direction.random();
    }

    getLifetime(): number {
        return this.lifetime;
    }

    getEnergy(): Direction {
        return this.energy;
    }

    getDirection(): Direction {
        return this.direction;
    }

    getGenome(): Genome {
        return this.genome;
    }

    visit(visitor: cellVisitor): void {
        visitor.visitOrganism(this);
    }

    update(context: CellContext): void {
        if (this.lifetime > MAX_LIFETIME || this.energy <= 0) {
            context.replace((factory: CellFactory) => factory.createMeat());
            return;
        }

        const offsetByDirection = Direction.getOffset(this.direction);
        const cell = context.getByOffest(...offsetByDirection);
        
        const action = this.genome.getAction(this, cell);

        if (action === OrganismAction.STEP) {
            context.moveByOffest(...offsetByDirection);
            this.energy--;
        } else if (action === OrganismAction.ROTATE_LEFT) {
            this.direction = Direction.rotateLeft(this.direction);
            this.energy--;
        } else if (action === OrganismAction.ROTATE_RIGHT) {
            this.direction = Direction.rotateLeft(this.direction);
            this.energy--;
        } else if (action === OrganismAction.DIVIDE) {
            if (cell.isEmpty()) {
                context.moveByOffest(...offsetByDirection);
                this.energy = Math.floor(this.energy / 2);
                context.replace((factory: CellFactory) => factory.createOrganism(this.color, this.genome.clone(), this.energy));
            }
        } else if (action === OrganismAction.ATTACK) {
            const self = this;

            cell.visit(new class extends CellVisitor {
                visitOrganism(cell: OrganismCell): void {
                    cell.kill();
                    self.energy--;
                }
            });
        } else if (action === OrganismAction.EAT) {
            const eat = (energy: number) => {
                context.deleteByOffset(...offsetByDirection);
                context.moveByOffest(...offsetByDirection);
                this.energy += energy;
            }

            cell.visit(new class extends CellVisitor {
                visitMeat(cell: MeatCell): void {
                    eat(ENERGY_MEAT);
                }

                visitPlant(cell: PlantCell): void {
                    eat(ENERGY_PLANT);
                }
            });
        }

        this.lifetime++;
    }

    kill() {
        this.energy = 0;
    }

    isStatic(): boolean {
        return false;
    }

    isSimilar(cell: OrganismCell): boolean {
        return this.genome.isSimilar(cell.getGenome());
    }

    getColor(): Color {
        return this.color;
    }
}