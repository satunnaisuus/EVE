import { GenomeSerialized, GENOME_VERSION } from "../../simulation/types/cells";
import { GenomeItem } from "../stores/genome-bank/genome-item";
import { GenomeRepository } from "../stores/genome-bank/genome-repository";
import { IndexedBdRepository } from "./indexedbd-repository";

const STORE_NAME = 'genomes';

interface GenomeItemSerialized {
    id: string;
    name: string;
    genome: GenomeSerialized;
    createdAt: number;
}

export class IndexedBdGenomeRepository extends IndexedBdRepository implements GenomeRepository {
    constructor() {
        super(STORE_NAME);
    }

    async findAll(): Promise<GenomeItem[]> {
        const store = await this.getStore('readonly');
        const items = await store.getAll<GenomeItemSerialized>();
        return items
            .filter((i) => i.genome.version === GENOME_VERSION)
            .map((i) => new GenomeItem(i.name, i.id, i.genome, i.createdAt));
    }

    async put(item: GenomeItem): Promise<void> {
        const store = await this.getStore('readwrite');
        await store.put(item.serialize());
    }

    async delete(item: GenomeItem): Promise<void> {
        const store = await this.getStore('readwrite');
        await store.delete(item.getId());
    }
}