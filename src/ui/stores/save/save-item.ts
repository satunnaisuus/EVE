import { RenderMode } from "../../../renderer/renderer";
import { Dump } from "../../../simulation/simulation";

export class SaveItem {
    constructor(
        private id: string,
        private createdAt: number,
        private step: number,
        private renderMode: RenderMode,
        private version: number
    ) {
    }

    getId(): string {
        return this.id;
    }

    getStep(): number {
        return this.step;
    }

    getCreatedAt(): number {
        return this.createdAt;
    }

    getRenderMode(): RenderMode {
        return this.renderMode;
    }

    equals(item: SaveItem): boolean {
        return this.id === item.getId();
    }

    serialize(dump: Dump = null) {
        return {
            id: this.id,
            createdAt: this.createdAt,
            step: this.step,
            renderMode: this.renderMode,
            dump: dump,
            version: this.version,
        };
    }
}