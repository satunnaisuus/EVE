import { GENOME_VERSION } from "../../simulation/types/cells";
import { GenomeItem } from "../stores/genome-bank/genome-item";
import { GenomeRepository } from "../stores/genome-bank/genome-repository";

const DB_NAME = 'eve';
const STORE_NAME = 'genomes';

export class IndexedBdGenomeRepository implements GenomeRepository {
    private openRequest: IDBOpenDBRequest;

    private db: IDBDatabase;

    constructor() {
        this.openRequest = indexedDB.open(DB_NAME);

        this.openRequest.addEventListener('upgradeneeded', () => {
            const db = this.openRequest.result;
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        });
          
        this.openRequest.addEventListener('error', () => {
            console.error("Error", this.openRequest.error);
        });
        
        this.openRequest.addEventListener('success', () => {
            this.db = this.openRequest.result;
        });
    }

    findAll(): Promise<GenomeItem[]> {
        return new Promise(async (resolve, reject) => {
            const db = await this.getDB();
            const transaction = db.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);
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
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(item.serialize());
            request.onsuccess = () => resolve();
            request.onerror = () => reject();
        });
    }

    delete(item: GenomeItem): Promise<void> {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(item.getId());
            request.onsuccess = () => resolve();
            request.onerror = () => reject();
        });
    }

    private getDB(): Promise<IDBDatabase> {
        return new Promise((resolve) => {
            if (this.db) {
                resolve(this.db);
            } else {
                this.openRequest.addEventListener('success', () => resolve(this.openRequest.result))
            }
        });
    }
}