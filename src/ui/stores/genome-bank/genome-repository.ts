import { GenomeItem } from "./genome-item";

export interface GenomeRepository {
    findAll(): Promise<GenomeItem[]>;

    put(item: GenomeItem): Promise<void>;

    delete(item: GenomeItem): Promise<void>;
}