import { makeObservable, observable, action, runInAction } from "mobx";
import { SimulationParameters } from "../../simulation/types/simulation-parameters";
import { SimulationStore } from "./simulation-store";

export class SimulationParametersStore {
    @observable
    private organismMaxLifetime = 100;

    @observable
    private photosynthesisEnergy = 5;

    @observable
    private chemosynthesisEnergy = 5;

    @observable
    private mutationChance = 25;

    constructor(private store: SimulationStore) {
        makeObservable(this);
    }

    @action
    init(parameters: SimulationParameters) {
        this.organismMaxLifetime = parameters.organismMaxLifetime;
        this.photosynthesisEnergy = parameters.photosynthesisEnergy;
        this.chemosynthesisEnergy = parameters.chemosynthesisEnergy;
        this.mutationChance = parameters.mutationChance;
    }

    @action
    setOrganismMaxLifetime(value: number): void {
        this.store.getSimulation().setParameter('organismMaxLifetime', value).then(value => {
            runInAction(() => {
                this.organismMaxLifetime = value;
            });
        });
    }

    @action
    setPhotosynthesisEnergy(value: number): void {
        this.store.getSimulation().setParameter('photosynthesisEnergy', value).then(value => {
            runInAction(() => {
                this.photosynthesisEnergy = value;
            });
        });
    }

    @action
    setChemosynthesisEnergy(value: number): void {
        this.store.getSimulation().setParameter('chemosynthesisEnergy', value).then(value => {
            runInAction(() => {
                this.chemosynthesisEnergy = value;
            });
        });
    }

    @action
    setMutationChance(value: number): void {
        this.store.getSimulation().setParameter('mutationChance', value).then(value => {
            runInAction(() => {
                this.mutationChance = value;
            });
        });
    }

    getOrganismMaxLifetime(): number {
        return this.organismMaxLifetime;
    }

    getPhotosynthesisEnergy(): number {
        return this.photosynthesisEnergy;
    }

    getChemosynthesisEnergy(): number {
        return this.chemosynthesisEnergy;
    }

    getMutationChance(): number {
        return this.mutationChance;
    }
}