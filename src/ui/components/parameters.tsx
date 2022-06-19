import * as React from "react";
import { observer } from "mobx-react-lite";
import { FormRow } from "./form/form-row";
import { RangeInput } from "./form/range-input";
import { SimulationContext } from "../context";
import { useContext } from "react";

interface Props {
    
}

export const Parameters = observer(({}: Props) => {
    const simulation = useContext(SimulationContext);
    const parameters = simulation.getParameters();

    return simulation.isReady()
        && <>
            <FormRow label={'Lifetime limit (' + parameters.getOrganismMaxLifetime() + ')'}>
                    <RangeInput min={1} max={255} step={1} onChange={(v) => parameters.setOrganismMaxLifetime(v)} value={parameters.getOrganismMaxLifetime()} />
                </FormRow>
                <FormRow label={'Organic energy (' + parameters.getOrganicEnergy() + ')'}>
                    <RangeInput min={0} max={255} step={1} onChange={(v) => parameters.setOrganicEnergy(v)} value={parameters.getOrganicEnergy()} />
                </FormRow>
                <FormRow label={'Photosynthesis energy (' + parameters.getPhotosynthesisEnergy() + ')'}>
                    <RangeInput min={0} max={255} step={1} onChange={(v) => parameters.setPhotosynthesisEnergy(v)} value={parameters.getPhotosynthesisEnergy()} />
                </FormRow>
        </>;
});