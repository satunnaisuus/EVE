import { observer } from "mobx-react-lite";
import * as React from "react";
import { useContext, useState } from "react";
import { RenderStrategy } from "../../../render/canvas-renderer";
import { StoreContext } from "../../context";
import { Button } from "../button";
import { Card } from "../card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { Row } from "../layout/row";
import { Column } from "../layout/column";
import { FormRow } from "../form/form-row";
import { Select } from "../form/select";
import { RangeInput } from "../form/range-input";
import { Switch } from "../form/switch";

export const SimulationParamsCard = observer(() => {
    const store = useContext(StoreContext);
    const params = store.getOptions().getParams();

    return (
        <Card>
            <FormRow label={`Plant spawn rate (${params.getPlantSpawnRate()}%)`}>
                <RangeInput min={0} max={100} step={1} onChange={(value) => params.setPlantSpawnRate(value)} value={params.getPlantSpawnRate()} />
            </FormRow>
        </Card>
    );
});