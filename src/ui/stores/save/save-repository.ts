import { Dump } from "../../../simulation/simulation";
import { SaveItem } from "./save-item";

export interface SaveRepository {
    findAll(): Promise<SaveItem[]>;

    add(item: SaveItem, dump: Dump): Promise<void>;

    delete(item: SaveItem): Promise<void>;

    getDump(item: SaveItem): Promise<Dump>;
}