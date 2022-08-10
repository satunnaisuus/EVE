export class SimulationParameters {
    private organismMaxLifetimeValue = 255;

    private photosynthesisEnergyValue = 5;

    private chemosynthesisEnergyValue = 5;

    private mutationChanceValue = 25;

    constructor(options: {[key: string]: any} = {}) {
        if (options['photosynthesisEnergy'] != null) {
            this.photosynthesisEnergy = options['photosynthesisEnergy'];
        }

        if (options['chemosynthesisEnergy'] != null) {
            this.chemosynthesisEnergy = options['chemosynthesisEnergy'];
        }

        if (options['organismMaxLifetime'] != null) {
            this.organismMaxLifetime = options['organismMaxLifetime'];
        }

        if (options['mutationChance'] != null) {
            this.mutationChance = options['mutationChance'];
        }
    }

    set organismMaxLifetime(value: number) {
        this.organismMaxLifetimeValue = this.converNumberValue(value, true, 1, 255);
    }

    get organismMaxLifetime(): number {
        return this.organismMaxLifetimeValue;
    }

    set photosynthesisEnergy(value: number) {
        this.photosynthesisEnergyValue = this.converNumberValue(value, false, 0, 255);
    }

    get photosynthesisEnergy(): number {
        return this.photosynthesisEnergyValue;
    }

    set chemosynthesisEnergy(value: number) {
        this.chemosynthesisEnergyValue = this.converNumberValue(value, false, 0, 255);
    }

    get chemosynthesisEnergy(): number {
        return this.chemosynthesisEnergyValue;
    }

    set mutationChance(value: number) {
        this.mutationChanceValue = this.converNumberValue(value, false, 0, 100);
    }

    get mutationChance(): number {
        return this.mutationChanceValue;
    }

    serialize(): any {
        return {
            photosynthesisEnergy: this.photosynthesisEnergy,
            chemosynthesisEnergy: this.chemosynthesisEnergy,
            organismMaxLifetime: this.organismMaxLifetime,
            mutationChance: this.mutationChance
        };
    }

    private converNumberValue(value: number, trunc = true, min: number = null, max: number = null): number {
        if (trunc) {
            value = Math.trunc(value);
        }
        
        if (min == null) {
            value = Math.max(min, value);
        }

        if (max == null) {
            value = Math.min(max, value);
        }

        return value;
    }
}