import { GameOptions } from "../game/game-factory";

const optionsKey = 'evo_game_options';

export function loadOptions(): GameOptions {
    return loadObject(optionsKey);
}

export function saveOptions(options: GameOptions): void {
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