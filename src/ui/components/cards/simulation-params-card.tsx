import { observer } from "mobx-react-lite";
import * as React from "react";
import { useContext } from "react";
import { AppContext } from "../../context";
import { Card } from "../card";
import { FormRow } from "../form/form-row";
import { RangeInput } from "../form/range-input";

export const SimulationParamsCard = observer(() => {
    const {gameStore} = useContext(AppContext);
    const params = gameStore.getOptions().getParams();

    return (
        <Card>
            <FormRow label={`Plant spawn rate (${params.getPlantSpawnRate()}%)`}>
                <RangeInput min={0} max={100} step={1} onChange={(value) => params.setPlantSpawnRate(value)} value={params.getPlantSpawnRate()} />
            </FormRow>
        </Card>
    );
});