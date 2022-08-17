import { GridLoopType } from "../simulation/types/grid-loop-type";
import { SimulationOptions } from "../simulation/types/simulation-options";

const optionsKey = 'evo_simulation_options';

export function loadOptions(): SimulationOptions {
    return Object.assign({
        width: 200,
        height: 100,
        loop: GridLoopType.NONE,
        population: 5,
        initialEnergy: 70,
        lightDepth: 100,
        lightGradient: false,
        mineralsDepth: 100,
        mineralsGradient: false,
        programLength: 16,
    }, loadObject(optionsKey));
}

export function saveOptions(options: SimulationOptions): void {
    saveObject(optionsKey, options);
}

function loadObject(key: string) {
    const json = localStorage.getItem(key);
    let result = {};

    if (typeof json === 'string') {
        const parsedOptions = JSON.parse(json);

        if (typeof parsedOptions === 'object') {
            result = parsedOptions;
        }
    }

    return result;
}

function saveObject(key: string, object: unknown) {
    localStorage.setItem(key, JSON.stringify(object));
}