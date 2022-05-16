import { makeObservable, observable, action } from "mobx";
import { GameParams } from "../../game/game-params";

export class GameParamsStore {
    private params: GameParams;

    @observable
    private organismMaxLifetime: number;

    @observable
    private photosynthesisEnergy: number;

    @observable
    private organicsEnergy: number;

    constructor() {
        this.params = new GameParams();
        this.organismMaxLifetime = this.params.getOrganismMaxLifetime();
        this.photosynthesisEnergy = this.params.getPhotosynthesisEnergy();
        this.organicsEnergy = this.params.getOrganicEnergy();

        makeObservable(this);
    }

    getOrganismMaxLifetime(): number {
        return this.organismMaxLifetime;
    }

    @action
    setOrganismMaxLifetime(value: number): void {
        this.organismMaxLifetime = value;
        this.params.setOrganismMaxLifetime(value);
    }

    getPhotosynthesisEnergy(): number {
        return this.photosynthesisEnergy;
    }

    @action
    setPhotosynthesisEnergy(value: number): void {
        this.photosynthesisEnergy = value;
        this.params.setPhotosynthesisEnergy(value);
    }

    getOrganicEnergy(): number {
        return this.organicsEnergy;
    }

    @action
    setOrganicEnergy(value: number): void {
        this.organicsEnergy = value;
        this.params.setOrganicEnergy(value);
    }

    getGameParams(): GameParams {
        return this.params;
    }
}