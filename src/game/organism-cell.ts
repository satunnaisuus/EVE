import { Cell } from "./cell";
import CellContext from "./cell-context";
import cellVisitor from "./cell-visitor";

export class OrganismCell extends Cell {
    private lifetime: number = 0;

    getLifetime(): number {
        return this.lifetime;
    }

    visit(visitor: cellVisitor): void {
        visitor.visitOrganism(this);
    }

    update(context: CellContext): void {
        this.lifetime++;

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
    }

    isStatic(): boolean {
        return false;
    }
}