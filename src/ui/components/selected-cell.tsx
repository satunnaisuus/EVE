import * as React from "react";
import { observer } from "mobx-react-lite";
import { SimulationContext } from "../context";
import { useContext } from "react";
import { OrganismCell } from "./cell/organism";
import { UnselectedCell } from "./cell/unselected";
import { CellType } from "../../simulation/types/cells";

export const SelectedCell = observer(() => {
    const simulation = useContext(SimulationContext);
    const selectedCell = simulation.getSelectedCell();
    const cell = selectedCell.getCell();

    if (! cell || cell.type !== CellType.ORGANISM) {
        return <UnselectedCell />;
    }

    return <OrganismCell />
});