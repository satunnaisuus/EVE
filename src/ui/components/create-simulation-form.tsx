import * as React from "react";
import { useState } from "react";
import { GridLoopType } from "../../simulation/types/grid-loop-type";
import { SimulationOptions } from "../../simulation/types/simulation-options";
import { Button } from "./button";
import { Card } from "./card";
import { Flex } from "./flex";
import { FormRow } from "./form/form-row";
import { NumberInput } from "./form/number-input";
import { RangeInput } from "./form/range-input";
import { Select } from "./form/select";

interface Props {
    options: SimulationOptions;
    onCreate: (options: SimulationOptions) => any;
}

const LoopTypes = [
    {label: 'None', value: GridLoopType.NONE},
    {label: 'Torus', value: GridLoopType.TORUS},
    {label: 'Horizontal', value: GridLoopType.HORIZONTAL},
    {label: 'Vertical', value: GridLoopType.VERTICAL},
];

export const CreateSimulationForm = ({options, onCreate}: Props) => {
    const [loop, setLoop] = useState(options.loop);
    const [width, setWidth] = useState(options.width);
    const [height, setHeight] = useState(options.height);
    const [initialEnergy, setInitialEnergy] = useState(options.initialEnergy);
    const [population, setPopulation] = useState(options.population);

    const create = () => {
        onCreate({
            loop: loop,
            width: width,
            height: height,
            initialEnergy: initialEnergy,
            population: population,
        });
    }

    return (
        <Flex align="center" justify="center">
            <Card>
                <FormRow label="Grid width">
                    <NumberInput min={0} onChange={(value) => setWidth(value)} value={width} />
                </FormRow>
                <FormRow label="Grid height">
                    <NumberInput min={0} onChange={(value) => setHeight(value)} value={height} />
                </FormRow>
                <FormRow label="Loop">
                    <Select onSelect={(value) => setLoop(value as GridLoopType)} options={LoopTypes} value={loop} />
                </FormRow>
                <FormRow label={`Population (${population}%)`}>
                    <RangeInput min={0} max={100} step={0.1} onChange={(value) => setPopulation(value)} value={population} />
                </FormRow>
                <FormRow label={`Initial energy (${initialEnergy})`}>
                    <RangeInput min={0} max={100} step={1} onChange={(value) => setInitialEnergy(value)} value={initialEnergy} />
                </FormRow>
                <Button width="100%" onClick={create}>Create</Button>
            </Card>
        </Flex>
    );
};