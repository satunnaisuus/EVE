import { Cell } from "./cell";
import { EmptyCell } from "./empty-cell";
import { MeatCell } from "./meat-cell";
import { OrganismAction } from "./organism-action";
import { OrganismCell } from "./organism-cell";
import { PlantCell } from "./plant-cell";
import { WallCell } from "./wall";

const MUTATION_POWER = 5;

enum Target {
    EMPTY = 0,
    WALL = 1,
    PLANT = 2,
    MEAT = 3,
    ORGANISM_SIMILAR = 4,
    ORGANISM_OTHER = 5
}

const randomAction = () => {
    const enumValues = Object.keys(OrganismAction)
        .map(n => Number.parseInt(n))
        .filter(n => !Number.isNaN(n)) as unknown as OrganismAction[];
    return enumValues[Math.floor(Math.random() * enumValues.length)];
}

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export default class Genome {
    constructor(
        private mutationСhance: number,
        private similarityLimit: number,
        private reflexes: {[key: `${number}`]: OrganismAction} = {}
    ) {
        
    }

    getAction(organism: OrganismCell, tagretCell: Cell): OrganismAction {
        const divisionPossible = organism.getEnergy() > 50;

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
        let reflexes: {[key: `${number}`]: OrganismAction} = {};

        for (let key of Genome.generateReflexKeys()) {
            reflexes[key] = this.reflexes[key];
        }

        if (this.mutationСhance > getRandomInt(100)) {
            const mutateParam = getRandomInt(8);
        
            if (mutateParam === 0) {
                mutationСhance += MUTATION_POWER * (getRandomInt(2) === 1 ? -1 : 1)
            } else if (mutateParam === 1) {
                similarityLimit += MUTATION_POWER * (getRandomInt(2) === 1 ? -1 : 1)
            } else if (mutateParam >= 2) {
                const keys = Genome.generateReflexKeys();
                reflexes[keys[getRandomInt(keys.length)]] = randomAction();
            }
        }

        return new Genome(
            mutationСhance,
            similarityLimit,
            reflexes
        );
    }

    static generateReflexKeys(): `${number}`[] {
        const target = Object.values(Target).filter(v => typeof v === 'number') as number[];

        const result: `${number}`[] = [];

        for (let targetValue of target) {
            result.push(`${targetValue}`);
        }

        return result;
    }

    static createRandom(): Genome {
        let reflexes: {[key: `${number}`]: OrganismAction} = {};

        for (let key of Genome.generateReflexKeys()) {
            reflexes[key] = randomAction();
        }

        return new Genome(
            Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 100),
            reflexes
        );
    }
}