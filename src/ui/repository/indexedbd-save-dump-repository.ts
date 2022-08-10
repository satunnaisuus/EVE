import { Dump } from "../../simulation/simulation";
import { IndexedBdRepository } from "./indexedbd-repository";

const STORE_NAME = 'save_dump';

interface SaveDumpSerialized {
    id: string;
    dump: Dump;
}

export class IndexedBdSaveDumpRepository extends IndexedBdRepository {
    constructor() {
        super(STORE_NAME);
    }

    async find(id: string): Promise<Dump> {
        const store = await this.getStore('readonly');
        const result = await store.get<SaveDumpSerialized>(id);
        return result.dump;
    }

    async add(id: string, dump: Dump): Promise<void> {
        const store = await this.getStore('readwrite');
        await store.put({id: id, dump: dump});
    }

    async delete(id: string): Promise<void> {
        const store = await this.getStore('readwrite');
        await store.delete(id);
    }
}