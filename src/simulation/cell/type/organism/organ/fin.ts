import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractOrgan } from "../abstract-organ";
import { rotateLeft, rotateRight } from "../direction";

const PARAMETER_FACTOR = 3;

export class Fin extends AbstractOrgan {
    use(organism: OrganismCell, parameter: number, context: CellContext): boolean {
        switch (parameter % PARAMETER_FACTOR) {
            case 0:
                organism.setDirection(rotateLeft(organism.getDirection()));
                return false;
            case 1:
                organism.setDirection(rotateRight(organism.getDirection()));
                return false;
            case 2:
                return context.moveByDirection(organism.getDirection());
        }

        return false;
    }

    sense(): boolean {
        return false;
    }
}