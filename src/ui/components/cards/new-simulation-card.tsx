import { observer } from "mobx-react-lite";
import * as React from "react";
import { useContext } from "react";
import { AppContext } from "../../context";
import { Button } from "../button";
import { Card } from "../card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { Row } from "../layout/row";
import { Column } from "../layout/column";
import { FormRow } from "../form/form-row";
import { NumberInput } from "../form/number-input";
import { Select } from "../form/select";
import { RangeInput } from "../form/range-input";
import { GridLoopType } from "../../../simulation/types/grid-loop-type";

const LoopTypes = [
    {label: 'None', value: GridLoopType.NONE},
    {label: 'Torus', value: GridLoopType.TORUS},
    {label: 'Horizontal', value: GridLoopType.HORIZONTAL},
    {label: 'Vertical', value: GridLoopType.VERTICAL},
]

export const NewSimulationCard = observer(() => {
    const {simulationStore, UIStore} = useContext(AppContext);
    const options = simulationStore.getOptions();

    return (
        <Card>
            {UIStore.getOptionsFormOpened() && <>
                <FormRow label="Grid width">
                    <NumberInput min={0} onChange={(value) => options.setWidth(value)} value={options.getWidth()} />
                </FormRow>
                <FormRow label="Grid height">
                    <NumberInput min={0} onChange={(value) => options.setHeight(value)} value={options.getHeight()} />
                </FormRow>
                <FormRow label="Loop">
                    <Select onSelect={(value) => options.setLoop(value as GridLoopType)} options={LoopTypes} value={options.getLoop()} />
                </FormRow>
                <FormRow label={`Population (${options.getPopulation()}%)`}>
                    <RangeInput min={0} max={100} step={0.1} onChange={(value) => options.setPopulation(value)} value={options.getPopulation()} />
                </FormRow>
                <FormRow label={`Initial energy (${options.getInitialEnergy()})`}>
                    <RangeInput min={0} max={100} step={1} onChange={(value) => options.setInitialEnergy(value)} value={options.getInitialEnergy()} />
                </FormRow>
            </>}
            <Row>
                <Column>
                    <Button width="100%" onClick={() => {simulationStore.newSimulation(); UIStore.setOptionsFormOpened(false)}}>New simulation</Button>
                </Column>
                <Column width={60}>
                    <Button width="100%" onClick={() => UIStore.setOptionsFormOpened(! UIStore.getOptionsFormOpened())}>
                        <FontAwesomeIcon icon={faGear} />
                    </Button>
                </Column>
            </Row>
        </Card>
    );
});