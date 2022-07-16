import * as React from "react";
import { observer } from "mobx-react-lite";
import { SimulationContext } from "../context";
import { useContext } from "react";
import { RangeRow } from "./form/range-row";

interface Props {
    
}

export const Parameters = observer(({}: Props) => {
    const simulation = useContext(SimulationContext);
    const parameters = simulation.getParameters();

    return (
        <>
            <RangeRow label={`Lifetime limit`} min={1} max={255} step={1} onChange={(v) => parameters.setOrganismMaxLifetime(v)} value={parameters.getOrganismMaxLifetime()} />
            <RangeRow label={`Organic energy`} min={0} max={255} step={1} onChange={(v) => parameters.setOrganicEnergy(v)} value={parameters.getOrganicEnergy()} />
            <RangeRow label={`Photosynthesis energy`} min={0} max={255} step={1} onChange={(v) => parameters.setPhotosynthesisEnergy(v)} value={parameters.getPhotosynthesisEnergy()} />
            <RangeRow label={`Chemosynthesis energy`} min={0} max={255} step={1} onChange={(v) => parameters.setChemosynthesisEnergy(v)} value={parameters.getChemosynthesisEnergy()} />
        </>
    );
});