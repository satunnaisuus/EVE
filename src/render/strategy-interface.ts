import { CellVisitor } from "../simulation/cell/cell-visitor";

export interface StategyInterface {
    createVisitor(x: number, y: number, cellSize: number): CellVisitor;
}