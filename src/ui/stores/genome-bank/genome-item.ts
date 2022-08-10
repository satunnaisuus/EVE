import { makeObservable, observable, toJS } from "mobx";
import { GenomeSerialized, GENOME_VERSION } from "../../../simulation/types/cells";

export interface GenomeItemSerialized {
    id: string;
    name: string;
    createdAt: number;
    genome: GenomeSerialized;
}

export class GenomeItem {
    @observable private name: string;

    constructor(
        name: string,
        private id: string,
        private genome: GenomeSerialized,
        private createdAt: number
    ) {
        makeObservable(this);

        if (genome.version !== GENOME_VERSION) {
            throw new Error('Bad genome version');
        }

        this.name = name;
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getGenome(): GenomeSerialized {
        return this.genome;
    }

    getCreatedAt(): number {
        return this.createdAt;
    }

    equals(item: GenomeItem): boolean {
        return this.id === item.getId();
    }

    serialize(): GenomeItemSerialized {
        return {
            id: this.id,
            name: this.name,
            createdAt: this.createdAt,
            genome: toJS(this.genome),
        };
    }
}