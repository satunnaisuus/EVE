import { GameOptions } from "../game/game-factory";

const localStorageKey = 'evo_game_options';

export function loadOptions(): GameOptions {
    let optionsJson = localStorage.getItem(localStorageKey);
    let options: GameOptions = {};

    if (typeof optionsJson === 'string') {
        const parsedOptions = JSON.parse(optionsJson);

        if (typeof parsedOptions === 'object') {
            options = parsedOptions;
        }
    }

    return options;
}

export function saveOptions(options: GameOptions): void {
    localStorage.setItem(localStorageKey, JSON.stringify(options));
}