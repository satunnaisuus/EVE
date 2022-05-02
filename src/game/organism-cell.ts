import { Cell } from "./cell";
import CellContext from "./cell-context";
import CellFactory from "./cell-factory";
import cellVisitor from "./cell-visitor";

const MAX_LIFETIME = 100;
const INITIAL_ENERGY = 100;

export class OrganismCell extends Cell {
    private lifetime: number = 0;

    private energy: number = INITIAL_ENERGY;

    getLifetime(): number {
        return this.lifetime;
    }

    visit(visitor: cellVisitor): void {
        visitor.visitOrganism(this);
    }

    update(context: CellContext): void {
        if (this.lifetime > MAX_LIFETIME || this.energy <= 0) {
            context.replace((factory: CellFactory) => factory.createEmpty());
            return;
        }

        const getRandomOffest = () => {
            const random = Math.random() * 3;

            if (random >= 0 && random < 1) {
                return -1;
            }

            if (random >= 1 && random < 2) {
                return 0;
            }

            if (random >= 2 && random <= 3) {
                return 1;
            }
        }

        context.moveByOffest(getRandomOffest(), getRandomOffest());

        this.lifetime++;
        this.energy--;
    }

    isStatic(): boolean {
        return false;
    }
}