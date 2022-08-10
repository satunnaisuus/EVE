import { makeObservable, observable, runInAction } from "mobx";
import { GenomeSerialized } from "../../simulation/types/cells";
import { GenomeItem } from "./genome-bank/genome-item";
import { GenomeRepository } from "./genome-bank/genome-repository";

export class GenomeBankStore {
    @observable
    private items: GenomeItem[] = [];

    constructor(private repository: GenomeRepository) {
        makeObservable(this);

        this.refresh();
    }

    addGenome(genome: GenomeSerialized, name = ''): Promise<void> {
        return this.put(
            new GenomeItem(
                name,
                this.generateId(),
                genome,
                +Date.now()
            )
        );
    }

    getItems(): GenomeItem[] {
        return this.items.slice().sort((a, b) => b.getCreatedAt() - a.getCreatedAt());
    }

    refresh(): void {
        this.repository.findAll().then((items) => {
            runInAction(() => this.items = items);
        });
    }

    async put(item: GenomeItem): Promise<void> {
        await this.repository.put(item);
        
        runInAction(() => {
            const index = this.items.findIndex(i => i.equals(item));
            if (index === -1) {
                this.items.push(item);
            } else {
                this.items[index] = item;
            }
        });
    }

    async delete(item: GenomeItem): Promise<void> {
        await this.repository.delete(item);
        runInAction(() => this.items = this.items.filter((i) => ! i.equals(item)));
    }

    private generateId(): string {
        return crypto.randomUUID();
    }
}

