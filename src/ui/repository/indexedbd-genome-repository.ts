import { GENOME_VERSION } from "../../simulation/types/cells";
import { GenomeItem } from "../stores/genome-bank/genome-item";
import { GenomeRepository } from "../stores/genome-bank/genome-repository";
import { IndexedBdRepository } from "./indexedbd-repository";

const STORE_NAME = 'genomes';

export class IndexedBdGenomeRepository extends IndexedBdRepository implements GenomeRepository {
    constructor() {
        super(STORE_NAME);
    }

    findAll(): Promise<GenomeItem[]> {
        return new Promise(async (resolve, reject) => {
            const store = await this.getStore('readonly');
            const request = store.getAll();
            request.onsuccess = () => resolve(
                request.result
                    .filter((i) => i.genome.version === GENOME_VERSION)
                    .map((i) => new GenomeItem(i.name, i.id, i.genome, i.createdAt))
            );
            request.onerror = () => reject();
        });
    }

    put(item: GenomeItem): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const store = await this.getStore('readwrite');
            const request = store.put(item.serialize());
            request.onsuccess = () => resolve();
            request.onerror = () => reject();
        });
    }

    delete(item: GenomeItem): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const store = await this.getStore('readwrite');
            const request = store.delete(item.getId());
            request.onsuccess = () => resolve();
            request.onerror = () => reject();
        });
    }
}