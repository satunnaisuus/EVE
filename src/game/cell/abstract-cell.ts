import { GameParams } from "../game-params";
import { CellContext } from "./cell-context";
import { CellVisitor } from "./cell-visitor";

export abstract class AbstractCell {
    abstract visit(visitor: CellVisitor): void;

    update(context: CellContext, params: GameParams): void {
        
    }

    isStatic(): boolean {
        return true;
    }

    isEmpty(): boolean {
        return false;
    }

    abstract getType(): string;
}