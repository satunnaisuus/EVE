import CellVisitor from "../game/cell-visitor";

export default interface StategyInterface {
    createVisitor(x: number, y: number, cellSize: number): CellVisitor;
}