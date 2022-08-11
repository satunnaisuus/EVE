import * as React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { RangeRow } from "./form/range-row";
import { SimulationContext } from "./simulation";

export const Parameters = observer(() => {
    const {parameters} = useContext(SimulationContext);

    return (
        <>
            <RangeRow label={`Lifetime limit`} min={1} max={255} step={1} onChange={(v) => parameters.setOrganismMaxLifetime(v)} value={parameters.getOrganismMaxLifetime()} />
            <RangeRow label={`Photosynthesis energy`} min={0} max={255} step={1} onChange={(v) => parameters.setPhotosynthesisEnergy(v)} value={parameters.getPhotosynthesisEnergy()} />
            <RangeRow label={`Chemosynthesis energy`} min={0} max={255} step={1} onChange={(v) => parameters.setChemosynthesisEnergy(v)} value={parameters.getChemosynthesisEnergy()} />
            <RangeRow label={`Mutation chance`} min={0} max={100} step={1} onChange={(v) => parameters.setMutationChance(v)} value={parameters.getMutationChance()} />
        </>
    );
});