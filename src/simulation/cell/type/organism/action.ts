import { randomInt } from "../../../../common/random";

export enum OrganismAction {
    ROTATE_LEFT = 'ROTATE_LEFT',
    ROTATE_RIGHT = 'ROTATE_RIGHT',
    STEP = 'STEP',
    ATTACK = 'ATTACK',
    EAT = 'EAT',
    DIVIDE = 'DIVIDE',
    NOTHING = 'NOTHING',
    PHOTOSYNTHESIS = 'PHOTOSYNTHESIS',
}

export function randomAction(): OrganismAction {
    const actions = Object.keys(OrganismAction);
    return OrganismAction[actions[randomInt(0, actions.length - 1)] as keyof typeof OrganismAction];
}