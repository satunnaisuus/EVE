import { makeObservable, observable, action, runInAction } from "mobx";
import { GameParams } from "../../game/game";
import { GameStore } from "./game-store";

export class GameParamsStore {
    @observable
    plantSpawnRate: number;

    constructor(params: GameParams, private store: GameStore) {
        this.plantSpawnRate = params.plantSpawnRate || 10;

        makeObservable(this);
    }

    getPlantSpawnRate(): number {
        return this.plantSpawnRate;
    }

    @action
    setPlantSpawnRate(value: number): void {
        this.plantSpawnRate = value;
        this.store.getGame().getParams().plantSpawnRate = value;
    }

    toGameParams(): GameParams {
        return {
            plantSpawnRate: this.plantSpawnRate,
        }
    }
}