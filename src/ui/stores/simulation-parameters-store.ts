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

    @observable
    private eatCost = 2;

    @observable
    private attackCostRate = 5;

    @observable
    private divideCost = 20;

    @observable
    private armourProtectionRate = 50;

    @observable
    private spineDamageRate = 50;

    @observable
    private stepCost = 1;

    @observable
    private moveCost = 1;

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
        this.eatCost = parameters.eatCost;
        this.attackCostRate = parameters.attackCostRate;
        this.divideCost = parameters.divideCost;
        this.armourProtectionRate = parameters.armourProtectionRate;
        this.spineDamageRate = parameters.spineDamageRate;
        this.stepCost = parameters.stepCost;
        this.moveCost = parameters.moveCost;
    }

    @action
    setOrganismMaxLifetime(value: number): void {
        this.store.getSimulation().setParameter(Parameter.organismMaxLifetime, value).then(value => {
            runInAction(() => this.organismMaxLifetime = value);
        });
    }

    @action
    setPhotosynthesisEnergy(value: number): void {
        this.store.getSimulation().setParameter(Parameter.photosynthesisEnergy, value).then(value => {
            runInAction(() => this.photosynthesisEnergy = value);
        });
    }

    @action
    setChemosynthesisEnergy(value: number): void {
        this.store.getSimulation().setParameter(Parameter.chemosynthesisEnergy, value).then(value => {
            runInAction(() => this.chemosynthesisEnergy = value);
        });
    }

    @action
    setMutationProgramRate(value: number): void {
        this.store.getSimulation().setParameter(Parameter.mutationProgramRate, value).then(value => {
            runInAction(() => this.mutationProgramRate = value);
        });
    }

    @action
    setMutationBaseOrgansRate(value: number): void {
        this.store.getSimulation().setParameter(Parameter.mutationBaseOrgansRate, value).then(value => {
            runInAction(() => this.mutationBaseOrgansRate = value);
        });
    }

    @action
    setMutationLimbOrgansRate(value: number): void {
        this.store.getSimulation().setParameter(Parameter.mutationLimbOrgansRate, value).then(value => {
            runInAction(() => this.mutationLimbOrgansRate = value);
        });
    }

    @action
    setEatCost(value: number): void {
        this.store.getSimulation().setParameter(Parameter.eatCost, value).then(value => {
            runInAction(() => this.eatCost = value);
        });
    }

    @action
    setAttackCostRate(value: number): void {
        this.store.getSimulation().setParameter(Parameter.attackCostRate, value).then(value => {
            runInAction(() => this.attackCostRate = value);
        });
    }

    @action
    setArmourProtectionRate(value: number): void {
        this.store.getSimulation().setParameter(Parameter.armourProtectionRate, value).then(value => {
            runInAction(() => this.armourProtectionRate = value);
        });
    }

    @action
    setSpineDamageRate(value: number): void {
        this.store.getSimulation().setParameter(Parameter.spineDamageRate, value).then(value => {
            runInAction(() => this.spineDamageRate = value);
        });
    }

    @action
    setDivideCost(value: number): void {
        this.store.getSimulation().setParameter(Parameter.divideCost, value).then(value => {
            runInAction(() => this.divideCost = value);
        });
    }

    @action
    setStepCost(value: number): void {
        this.store.getSimulation().setParameter(Parameter.stepCost, value).then(value => {
            runInAction(() => this.stepCost = value);
        });
    }

    @action
    setMoveCost(value: number): void {
        this.store.getSimulation().setParameter(Parameter.moveCost, value).then(value => {
            runInAction(() => this.moveCost = value);
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

    getEatCost(): number {
        return this.eatCost;
    }

    getAttackCostRate(): number {
        return this.attackCostRate;
    }

    getArmourProtectionRate(): number {
        return this.armourProtectionRate;
    }

    getSpineDamageRate(): number {
        return this.spineDamageRate;
    }

    getDivideCost(): number {
        return this.divideCost;
    }

    getStepCost(): number {
        return this.stepCost;
    }

    getMoveCost(): number {
        return this.moveCost;
    }
}