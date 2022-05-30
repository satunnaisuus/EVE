import { SimulationOptions } from "../simulation/types/simulation-options";

const optionsKey = 'evo_simulation_options';

export function loadOptions(): SimulationOptions {
    return loadObject(optionsKey);
}

export function saveOptions(options: SimulationOptions): void {
    saveObject(optionsKey, options);
}

function loadObject(key: string) {
    let json = localStorage.getItem(key);
    let result = {};

    if (typeof json === 'string') {
        const parsedOptions = JSON.parse(json);

        if (typeof parsedOptions === 'object') {
            result = parsedOptions;
        }
    }

    return result;
}

function saveObject(key: string, object: any) {
    localStorage.setItem(key, JSON.stringify(object));
}