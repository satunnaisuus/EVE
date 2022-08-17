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
            <RangeRow label={`Eat cost`} min={0} max={255} step={1} onChange={(v) => parameters.setEatCost(v)} value={parameters.getEatCost()} />
            <RangeRow label={`Divide cost`} min={0} max={255} step={1} onChange={(v) => parameters.setDivideCost(v)} value={parameters.getDivideCost()} />
            <RangeRow label={`Simulation step cost`} min={0} max={255} step={1} onChange={(v) => parameters.setStepCost(v)} value={parameters.getStepCost()} />
            <RangeRow label={`Attack cost rate`} min={0} max={100} step={1} onChange={(v) => parameters.setAttackCostRate(v)} value={parameters.getAttackCostRate()} />
            <RangeRow label={`Spine damage rate`} min={0} max={255} step={1} onChange={(v) => parameters.setSpineDamageRate(v)} value={parameters.getSpineDamageRate()} />
            <RangeRow label={`Armour protection rate`} min={0} max={100} step={1} onChange={(v) => parameters.setArmourProtectionRate(v)} value={parameters.getArmourProtectionRate()} />
            <RangeRow label={`Mutation program rate`} min={0} max={100} step={1} onChange={(v) => parameters.setMutationProgramRate(v)} value={parameters.getMutationProgramRate()} />
            <RangeRow label={`Mutation base organs rate`} min={0} max={100} step={1} onChange={(v) => parameters.setMutationBaseOrgansRate(v)} value={parameters.getMutationBaseOrgansRate()} />
            <RangeRow label={`Mutation limb organs rate`} min={0} max={100} step={1} onChange={(v) => parameters.setMutationLimbOrgansRate(v)} value={parameters.getMutationLimbOrgansRate()} />
        </>
    );
});