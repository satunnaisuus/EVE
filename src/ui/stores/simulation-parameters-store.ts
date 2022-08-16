import { makeObservable, observable, action, runInAction } from "mobx";
import { Parameter } from "../../simulation/simulation";
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
    private mutationProgramRate = 25;

    @observable
    private mutationBaseOrgansRate = 25;

    @observable
    private mutationLimbOrgansRate = 0;

    constructor(private store: SimulationStore) {
        makeObservable(this);
    }

    @action
    init(parameters: SimulationParameters) {
        this.organismMaxLifetime = parameters.organismMaxLifetime;
        this.photosynthesisEnergy = parameters.photosynthesisEnergy;
        this.chemosynthesisEnergy = parameters.chemosynthesisEnergy;
        this.mutationProgramRate = parameters.mutationProgramRate;
        this.mutationBaseOrgansRate = parameters.mutationBaseOrgansRate;
        this.mutationLimbOrgansRate = parameters.mutationLimbOrgansRate;
    }

    @action
    setOrganismMaxLifetime(value: number): void {
        this.store.getSimulation().setParameter(Parameter.organismMaxLifetime, value).then(value => {
            runInAction(() => {
                this.organismMaxLifetime = value;
            });
        });
    }

    @action
    setPhotosynthesisEnergy(value: number): void {
        this.store.getSimulation().setParameter(Parameter.photosynthesisEnergy, value).then(value => {
            runInAction(() => {
                this.photosynthesisEnergy = value;
            });
        });
    }

    @action
    setChemosynthesisEnergy(value: number): void {
        this.store.getSimulation().setParameter(Parameter.chemosynthesisEnergy, value).then(value => {
            runInAction(() => {
                this.chemosynthesisEnergy = value;
            });
        });
    }

    @action
    setMutationProgramRate(value: number): void {
        this.store.getSimulation().setParameter(Parameter.mutationProgramRate, value).then(value => {
            runInAction(() => {
                this.mutationProgramRate = value;
            });
        });
    }

    @action
    setMutationBaseOrgansRate(value: number): void {
        this.store.getSimulation().setParameter(Parameter.mutationBaseOrgansRate, value).then(value => {
            runInAction(() => {
                this.mutationBaseOrgansRate = value;
            });
        });
    }

    @action
    setMutationLimbOrgansRate(value: number): void {
        this.store.getSimulation().setParameter(Parameter.mutationLimbOrgansRate, value).then(value => {
            runInAction(() => {
                this.mutationLimbOrgansRate = value;
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

    getMutationProgramRate(): number {
        return this.mutationProgramRate;
    }

    getMutationBaseOrgansRate(): number {
        return this.mutationBaseOrgansRate;
    }

    getMutationLimbOrgansRate(): number {
        return this.mutationLimbOrgansRate;
    }
}