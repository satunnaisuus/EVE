import { observer } from "mobx-react-lite";
import * as React from "react";
import { useContext } from "react";
import { AppContext } from "../../context";
import { Card } from "../card";
import { FormRow } from "../form/form-row";
import { NumberInput } from "../form/number-input";
import { RangeInput } from "../form/range-input";

export const SimulationParamsCard = observer(() => {
    const {gameStore} = useContext(AppContext);
    const params = gameStore.getParams();

    console.log(params);

    return (
        <Card>
            <FormRow label="Life time limit">
                <NumberInput onChange={(value) => params.setOrganismMaxLifetime(value)} value={params.getOrganismMaxLifetime()} />
            </FormRow>
            <FormRow label="Photosynthesis energy">
                <NumberInput onChange={(value) => params.setPhotosynthesisEnergy(value)} value={params.getPhotosynthesisEnergy()} />
            </FormRow>
            <FormRow label="Organic energy">
                <NumberInput onChange={(value) => params.setOrganicEnergy(value)} value={params.getOrganicEnergy()} />
            </FormRow>
        </Card>
    );
});