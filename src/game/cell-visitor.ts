import { EmptyCell } from "./empty-cell";
import { Organism } from "./organism";
import { WallCell } from "./wall";

export default interface CellVisitor {
    visitEmpty(cell: EmptyCell): void;

    visitWall(cell: WallCell): void;

    visitOrganism(cell: Organism): void;
}