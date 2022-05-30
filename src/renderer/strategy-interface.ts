import { CellType } from "../simulation/types/cells";

export interface StategyInterface {
    renderCell(cell: CellType, x: number, y: number, cellSize: number): void;
}