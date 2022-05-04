import CellVisitor from "../../game/cell-visitor";
import { OrganismCell } from "../../game/organism-cell";
import DefaultStrategy from "./default-strategy";

export default class GenesisStrategy extends DefaultStrategy {
    createVisitor(x: number, y: number, cellSize: number): CellVisitor {
        const visitor = super.createVisitor(x, y, cellSize);

        visitor.visitOrganism = (cell: OrganismCell) => {
            this.context.fillStyle = cell.getColor().toHexFormat();
            this.context.fillRect(x, y, cellSize, cellSize);
        }

        return visitor;
    }
}