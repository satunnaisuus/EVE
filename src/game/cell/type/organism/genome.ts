import { AbstractCell } from "../../abstract-cell";
import { EmptyCell } from "../empty-cell";
import { MeatCell } from "../meat-cell";
import { OrganismAction, randomAction } from "./action";
import { OrganismCell } from "../organism-cell";
import { PlantCell } from "../plant-cell";
import { WallCell } from "../wall-cell";
import { randomInt } from "../../../../common/random";

const MUTATION_POWER = 5;

enum Target {
    EMPTY = 'EMPTY',
    WALL = 'WALL',
    PLANT = 'PLANT',
    MEAT = 'MEAT',
    ORGANISM_SIMILAR = 'ORGANISM_SIMILAR',
    ORGANISM_OTHER = 'ORGANISM_OTHER',
}

export class Genome {
    constructor(
        private mutationСhance: number,
        private similarityLimit: number,
        private reflexes: {[key: string]: OrganismAction} = {}
    ) {
        
    }

    getAction(organism: OrganismCell, tagretCell: AbstractCell): OrganismAction {
        const divisionPossible = organism.getEnergy() > 60;

        let tagretType;

        tagretCell.visit({
            visitEmpty: (cell: EmptyCell) => {
                tagretType = Target.EMPTY;
            },
            visitWall: (cell: WallCell) => {
                tagretType = Target.WALL;
            },
            visitPlant: (cell: PlantCell) => {
                tagretType = Target.PLANT;
            },
            visitMeat: (cell: MeatCell) => {
                tagretType = Target.MEAT;
            },
            visitOrganism: (cell: OrganismCell) => {
                tagretType = organism.isSimilar(cell) ? Target.ORGANISM_SIMILAR : Target.ORGANISM_OTHER;
            }
        });

        if (divisionPossible && tagretType === Target.EMPTY) {
            return OrganismAction.DIVIDE;
        }

        const action = this.reflexes[`${tagretType as number}`];

        if (action === undefined || action === OrganismAction.DIVIDE && ! divisionPossible) {
            return OrganismAction.NOTHING;
        }

        return action;
    }

    compare(genome: Genome): number {
        return 0;
    }

    isSimilar(genome: Genome): boolean {
        return this.compare(genome) >= this.similarityLimit;
    }

    clone(): Genome {
        let similarityLimit = this.similarityLimit;
        let mutationСhance = this.mutationСhance;
        let reflexes: {[key: string]: OrganismAction} = {};

        for (let key of Object.keys(Target)) {
            reflexes[key] = this.reflexes[key];
        }

        if (this.mutationСhance > randomInt(0, 100)) {
            const mutateParam = randomInt(0, 7);
        
            if (mutateParam === 0) {
                mutationСhance += MUTATION_POWER * (randomInt(0, 1) === 1 ? -1 : 1)
            } else if (mutateParam === 1) {
                similarityLimit += MUTATION_POWER * (randomInt(0, 1) === 1 ? -1 : 1)
            } else if (mutateParam >= 2) {
                const keys = Object.keys(Target);
                reflexes[keys[randomInt(0, keys.length - 1)]] = randomAction();
            }
        }

        return new Genome(
            mutationСhance,
            similarityLimit,
            reflexes
        );
    }

    static createRandom(): Genome {
        let reflexes: {[key: string]: OrganismAction} = {};

        for (let key of Object.keys(Target)) {
            reflexes[key] = randomAction();
        }

        return new Genome(
            Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 100),
            reflexes
        );
    }
}