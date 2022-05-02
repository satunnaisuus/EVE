import { Cell } from "./cell";
import cellVisitor from "./cell-visitor";

export class OrganismCell extends Cell {
    private lifetime: number = 0;

    getLifetime(): number {
        return this.lifetime;
    }

    visit(visitor: cellVisitor): void {
        visitor.visitOrganism(this);
    }

    update(): void {
        this.lifetime++;
        console.log(this.lifetime);
    }

    isStatic(): boolean {
        return false;
    }
}