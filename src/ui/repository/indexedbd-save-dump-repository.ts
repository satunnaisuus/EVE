import { Dump } from "../../simulation/simulation";
import { IndexedBdRepository } from "./indexedbd-repository";

const STORE_NAME = 'save_dump';

export class IndexedBdSaveDumpRepository extends IndexedBdRepository {
    constructor() {
        super(STORE_NAME);
    }

    find(id: string): Promise<Dump> {
        return new Promise(async (resolve, reject) => {
            const store = await this.getStore('readonly');
            const request = store.get(id);
            request.onsuccess = () => resolve(request.result.dump);
            request.onerror = () => reject();
        });
    }

    add(id: string, dump: Dump): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const store = await this.getStore('readwrite');
            const request = store.put({
                id: id,
                dump: dump
            });
            request.onsuccess = () => resolve();
            request.onerror = () => reject();
        });
    }

    delete(id: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const store = await this.getStore('readwrite');
            const request = store.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = () => reject();
        });
    }
}