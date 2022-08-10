import { Dump, DUMP_VERSION } from "../../simulation/simulation";
import { SaveItem } from "../stores/save/save-item";
import { SaveRepository } from "../stores/save/save-repository";
import { IndexedBdRepository } from "./indexedbd-repository";
import { IndexedBdSaveDumpRepository } from "./indexedbd-save-dump-repository";

const STORE_NAME = 'save';

export class IndexedBdSaveRepository extends IndexedBdRepository implements SaveRepository {
    private dataRepository: IndexedBdSaveDumpRepository;

    constructor() {
        super(STORE_NAME);

        this.dataRepository = new IndexedBdSaveDumpRepository();
    }

    add(item: SaveItem, data: Dump): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const store = await this.getStore('readwrite');
            const request = store.put(item.serialize());
            request.onsuccess = () => {
                this.dataRepository.add(item.getId(), data).then(() => resolve());
            };
            request.onerror = () => reject();
        });
    }

    findAll(): Promise<SaveItem[]> {
        return new Promise(async (resolve, reject) => {
            const store = await this.getStore('readonly');
            const request = store.getAll();
            request.onsuccess = () => resolve(
                request.result
                    .filter((i) => i.version === DUMP_VERSION)
                    .map((i) => new SaveItem(i.id, i.createdAt, i.step, i.renderMode, i.version))
            );
            request.onerror = () => reject();
        });
    }

    delete(item: SaveItem): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const store = await this.getStore('readwrite');
            const request = store.delete(item.getId());
            request.onsuccess = () => {
                this.dataRepository
                    .delete(item.getId())
                    .then(() => resolve());
            };
            request.onerror = () => reject();
        });
    }

    getDump(item: SaveItem): Promise<Dump> {
        return this.dataRepository.find(item.getId());
    }
}