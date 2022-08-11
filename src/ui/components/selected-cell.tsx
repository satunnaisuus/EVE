import * as React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { OrganismCell } from "./cell/organism";
import { UnselectedCell } from "./cell/unselected";
import { CellType } from "../../simulation/types/cells";
import { SimulationContext } from "./simulation";

export const SelectedCell = observer(() => {
    const {selectedCell} = useContext(SimulationContext);
    const cell = selectedCell.getCell();

    if (! cell || cell.type !== CellType.ORGANISM) {
        return <UnselectedCell />;
    }

    return <OrganismCell />
});