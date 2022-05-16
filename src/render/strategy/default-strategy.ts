import { CellVisitor } from "../../game/cell/cell-visitor";
import { Direction } from "../../game/cell/type/organism/direction";
import { EmptyCell } from "../../game/cell/type/empty-cell";
import { OrganicCell } from "../../game/cell/type/organic-cell";
import { OrganismCell } from "../../game/cell/type/organism-cell";
import { WallCell } from "../../game/cell/type/wall-cell";
import { StategyInterface } from "../strategy-interface";

type Styles = {
    CELL_WALL_COLOR?: string,
    CELL_ORGANISM_COLOR?: string,
    CELL_ORGANISM_EYE_COLOR?: string,
    CELL_EMPTY_COLOR?: string,
    CELL_ORGANIC_COLOR?: string,
}

export class DefaultStrategy implements StategyInterface {
    constructor(
        protected context: CanvasRenderingContext2D,
        protected styles?: Styles
    ) {
        this.styles = Object.assign({
            CELL_WALL_COLOR: '#5f5f5f',
            CELL_ORGANISM_COLOR: '#0B5FA5',
            CELL_ORGANISM_EYE_COLOR: '#66A1D2',
            CELL_EMPTY_COLOR: '#000000',
            CELL_ORGANIC_COLOR: '#FE7276',
        }, styles);
    }

    createVisitor(x: number, y: number, cellSize: number): CellVisitor {
        return {
            visitEmpty: (cell: EmptyCell) => {
                
            },
            visitWall: (cell: WallCell) => {
                this.context.fillStyle = this.styles.CELL_WALL_COLOR;
                this.context.fillRect(x, y, cellSize, cellSize);
            },
            visitOrganic: (cell: OrganicCell) => {
                this.context.fillStyle = this.styles.CELL_ORGANIC_COLOR;
                this.context.fillRect(x, y, cellSize, cellSize);
            },
            visitOrganism: (cell: OrganismCell) => {
                this.context.fillStyle = this.styles.CELL_ORGANISM_COLOR;
                this.context.fillRect(x, y, cellSize, cellSize);

                const eyeSize = cellSize / 3;

                let eyeOffset;

                switch (cell.getDirection()) {
                    case Direction.NORTH_WEST:
                        eyeOffset = [0, 0];
                        break;
                    case Direction.NORTH:
                        eyeOffset = [eyeSize, 0];
                        break;
                    case Direction.NORTH_EAST:
                        eyeOffset = [eyeSize * 2, 0];
                        break;
                    case Direction.SOUTH_WEST:
                        eyeOffset = [0, eyeSize * 2];
                        break;
                    case Direction.SOUTH:
                        eyeOffset = [eyeSize, eyeSize * 2];
                        break;
                    case Direction.SOUTH_EAST:
                        eyeOffset = [eyeSize * 2, eyeSize * 2];
                        break;
                    case Direction.WEST:
                        eyeOffset = [0, eyeSize];
                        break;
                    case Direction.EAST:
                        eyeOffset = [eyeSize * 2, eyeSize];
                        break;
                }

                this.context.fillStyle = this.styles.CELL_ORGANISM_EYE_COLOR;
                this.context.fillRect(x + eyeOffset[0], y + eyeOffset[1], eyeSize, eyeSize);
            }
        };
    }
}