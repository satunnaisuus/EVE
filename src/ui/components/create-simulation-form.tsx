import * as React from "react";
import { useContext, useState } from "react";
import { GridLoopType } from "../../simulation/types/grid-loop-type";
import { SimulationOptions } from "../../simulation/types/simulation-options";
import { AppContext } from "../context";
import { Button } from "./button";
import { FormRow } from "./form/form-row";
import { NumberInput } from "./form/number-input";
import { RangeRow } from "./form/range-row";
import { Select } from "./form/select";
import { Switch } from "./form/switch";

interface Props {
    options: SimulationOptions;
}

const LoopTypes = [
    {label: 'None', value: GridLoopType.NONE},
    {label: 'Torus', value: GridLoopType.TORUS},
    {label: 'Horizontal', value: GridLoopType.HORIZONTAL},
    {label: 'Vertical', value: GridLoopType.VERTICAL},
];

export const CreateSimulationForm = ({options}: Props) => {
    const store = useContext(AppContext);
    
    const [loop, setLoop] = useState(options.loop);
    const [width, setWidth] = useState(options.width);
    const [height, setHeight] = useState(options.height);
    const [initialEnergy, setInitialEnergy] = useState(options.initialEnergy);
    const [population, setPopulation] = useState(options.population);
    const [lightDepth, setLightDepth] = useState(options.lightDepth);
    const [lightGradient, setLightGradient] = useState(options.lightGradient);
    const [mineralsDepth, setMineralsDepth] = useState(options.mineralsDepth);
    const [mineralsGradient, setMineralsGradient] = useState(options.mineralsGradient);

    const create = () => {
        store.newSimulation({
            loop: loop,
            width: width,
            height: height,
            initialEnergy: initialEnergy,
            population: population,
            lightDepth: lightDepth,
            lightGradient: lightGradient,
            mineralsDepth: mineralsDepth,
            mineralsGradient: mineralsGradient,
        });
    }

    return (
        <>
            <FormRow label='Grid width'>
                <NumberInput min={0} onChange={(value) => setWidth(value)} value={width} />
            </FormRow>

            <FormRow label='Grid height'>
                <NumberInput min={0} onChange={(value) => setHeight(value)} value={height} />
            </FormRow>

            <FormRow label='Loop'>
                <Select onSelect={(value) => setLoop(value as GridLoopType)} options={LoopTypes} value={loop} />
            </FormRow>

            <RangeRow label='Population' postfix='%' min={0} max={100} step={0.1} onChange={(value) => setPopulation(value)} value={population} />

            <RangeRow label='Initial energy' min={0} max={100} step={1} onChange={(value) => setInitialEnergy(value)} value={initialEnergy} />

            <RangeRow label='Light depth' postfix='%' min={0} max={100} step={0.1} onChange={(value) => setLightDepth(value)} value={lightDepth} />

            <Switch label='Light gradient' value={lightGradient} onChange={(checked) => setLightGradient(checked)} />

            <RangeRow label='Minerals depth' postfix='%' min={0} max={100} step={0.1} onChange={(value) => setMineralsDepth(value)} value={mineralsDepth} />

            <Switch label='Minerals gradient' value={mineralsGradient} onChange={(checked) => setMineralsGradient(checked)} />

            <Button apperance='primary' width='100%' onClick={create}>Create</Button>
        </>
    );
};