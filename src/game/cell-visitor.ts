import { EmptyCell } from "./empty-cell";
import { OrganismCell } from "./organism-cell";
import { WallCell } from "./wall";

export default interface CellVisitor {
    visitEmpty(cell: EmptyCell): void;

    visitWall(cell: WallCell): void;

    visitOrganism(cell: OrganismCell): void;
}