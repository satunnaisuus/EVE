import { action, makeObservable, observable, runInAction } from "mobx";
import { Dump } from "../../simulation/simulation";
import { RootStore } from "./root-store";
import { SaveItem } from "./save/save-item";
import { SaveRepository } from "./save/save-repository";

export class SaveStore {
    @observable
    private items: SaveItem[] = [];

    constructor(
        private store: RootStore,
        private repository: SaveRepository,
    ) {
        makeObservable(this);

        this.refresh();
    }

    @action
    addSave(item: SaveItem, dump: Dump): Promise<void> {
        this.items.push(item);
        return this.repository.add(item, dump);
    }

    getItems(): SaveItem[] {
        return this.items.slice().sort((a, b) => b.getCreatedAt() - a.getCreatedAt());
    }

    refresh(): void {
        this.repository.findAll().then((items) => {
            runInAction(() => this.items = items);
        });
    }

    async delete(item: SaveItem): Promise<void> {
        await this.repository.delete(item);
        runInAction(() => this.items = this.items.filter((i) => ! i.equals(item)));
    }

    async serialize(item: SaveItem) {
        return item.serialize(
            await this.repository.getDump(item)
        );
    }

    async getDump(item: SaveItem) {
        return await this.repository.getDump(item);
    }

    createItem(dump: Dump): SaveItem {
        return new SaveItem(
            this.generateId(),
            +Date.now(),
            dump.step,
            this.store.getSimulationStore().getRendererStore().getRenderMode(),
            dump.version
        );
    }

    private generateId(): string {
        return crypto.randomUUID();
    }
}

