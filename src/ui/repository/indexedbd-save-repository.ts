import { Dump, DUMP_VERSION } from "../../simulation/simulation";
import { SaveItem, SaveItemSerialized } from "../stores/save/save-item";
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

    async add(item: SaveItem, data: Dump): Promise<void> {
        const store = await this.getStore('readwrite');
        await store.put(item.serialize());
        await this.dataRepository.add(item.getId(), data);
    }

    async findAll(): Promise<SaveItem[]> {
        const store = await this.getStore('readonly');
        const items = await store.getAll<SaveItemSerialized>();
        return items
            .filter((i) => i.version === DUMP_VERSION)
            .map((i) => new SaveItem(i.id, i.createdAt, i.step, i.renderMode, i.version));
    }

    async delete(item: SaveItem): Promise<void> {
        const store = await this.getStore('readwrite');
        await store.delete(item.getId());
        await this.dataRepository.delete(item.getId());
    }

    getDump(item: SaveItem): Promise<Dump> {
        return this.dataRepository.find(item.getId());
    }
}