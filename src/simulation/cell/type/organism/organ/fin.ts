import { CellContext } from "../../../cell-context";
import { AbstractOrgan } from "../abstract-organ";
import { getOffset, rotateLeft, rotateRight } from "../direction";

const PARAMETER_FACTOR = 3;

export class Fin extends AbstractOrgan {
    use(parameter: number, context: CellContext): boolean {
        switch (Math.floor(parameter * PARAMETER_FACTOR)) {
            case 0:
                this.organism.setDirection(rotateLeft(this.organism.getDirection()));
                return true;
            case 1:
                this.organism.setDirection(rotateRight(this.organism.getDirection()));
                return true;
            case 2:
                const offset = getOffset(this.organism.getDirection());
                return context.moveByOffest(offset[0], offset[1]);
        }

        return false;
    }
}