import { CellContext } from "../../../cell-context";
import { OrganismCell } from "../../organism-cell";
import { AbstractOrgan } from "../abstract-organ";
import { rotateLeft, rotateRight } from "../direction";

const PARAMETER_FACTOR = 3;

export const getMovementTypeFromParameter = (parameter: number) => parameter % PARAMETER_FACTOR;

export enum MovementType {
    ROTATE_LEFT,
    ROTATE_RIGHT,
    MOVE_FORWARD,
}

export class Fin extends AbstractOrgan {
    use(organism: OrganismCell, parameter: number, context: CellContext): boolean {
        switch (parameter % PARAMETER_FACTOR) {
            case MovementType.ROTATE_LEFT:
                organism.setDirection(rotateLeft(organism.getDirection()));
                return false;
            case MovementType.ROTATE_RIGHT:
                organism.setDirection(rotateRight(organism.getDirection()));
                return false;
            case MovementType.MOVE_FORWARD:
                return context.moveByDirection(organism.getDirection());
        }

        return false;
    }

    sense(): boolean {
        return false;
    }
}