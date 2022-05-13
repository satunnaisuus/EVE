import { makeObservable, observable, action } from "mobx";
import { GameOptions } from "../../game/game-factory";
import { GridLoopType } from "../../game/grid-loop-type";
import { GameParamsStore } from "./game-params-store";
import { GameStore } from "./game-store";

export class GameOptionsStore {
    @observable
    private width: number;

    @observable
    private height: number;

    @observable
    private loop: GridLoopType;

    @observable
    private population: number;

    @observable
    private params: GameParamsStore;

    constructor(options: GameOptions, private store: GameStore) {
        this.width = options.width || 100;
        this.height = options.height || 50;
        this.population = options.population || 1;
        this.loop = options.loop || GridLoopType.NONE;
        this.params = new GameParamsStore(options.params || {
            plantSpawnRate: 10
        }, store);

        makeObservable(this);
    }

    getWidth(): number {
        return this.width;
    }
    
    @action
    setWidth(width: number): void {
        this.width = width;
    }

    getHeight(): number {
        return this.height;
    }

    @action
    setHeight(height: number): void {
        this.height = height;
    }

    getLoop(): GridLoopType {
        return this.loop;
    }

    @action
    setLoop(loop: GridLoopType): void {
        this.loop = loop;
    }

    getPopulation(): number {
        return this.population;
    }

    @action
    setPopulation(population: number): void {
        this.population = population;
    }

    getParams(): GameParamsStore {
        return this.params;
    }

    toGameOptions(): GameOptions {
        return {
            width: this.width,
            height: this.height,
            loop: this.loop,
            population: this.population,
            params: this.params.toGameParams(),
        };
    }
}