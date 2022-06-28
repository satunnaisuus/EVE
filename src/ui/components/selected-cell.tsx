import * as React from "react";
import { observer } from "mobx-react-lite";
import { SimulationContext } from "../context";
import { useContext } from "react";
import styled from "styled-components";
import { UnselectedCell } from "./cell/unselected";
import { OrganismCell } from "./cell/organism";

interface Props {
    
}

export const SelectedCell = observer(({}: Props) => {
    const simulation = useContext(SimulationContext);
    const cell = simulation.getSelectedCell();

    if (! cell || cell.type !== 'organism') {
        return <UnselectedCell />
    }

    return <OrganismCell />
});