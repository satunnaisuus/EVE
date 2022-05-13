import { CellVisitor } from "../game/cell/cell-visitor";

export interface StategyInterface {
    createVisitor(x: number, y: number, cellSize: number): CellVisitor;
}