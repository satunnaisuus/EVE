export class SimulationParameters {
    private organismMaxLifetimeValue: number = 100;

    private photosynthesisEnergyValue: number = 5;

    private organicEnergyValue: number = 30;

    constructor(options: {[key: string]: any} = {}) {
        if (options['photosynthesisEnergy'] != null) {
            this.photosynthesisEnergy = options['photosynthesisEnergy'];
        }

        if (options['organismMaxLifetime'] != null) {
            this.organismMaxLifetime = options['organismMaxLifetime'];
        }

        if (options['organicEnergy'] != null) {
            this.organicEnergy = options['organicEnergy'];
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

    set organicEnergy(value: number) {
        this.organicEnergyValue = this.converNumberValue(value, false, 0, 255);
    }

    get organicEnergy(): number {
        return this.organicEnergyValue;
    }

    serialize(): any {
        return {
            photosynthesisEnergy: this.photosynthesisEnergy,
            organismMaxLifetime: this.organismMaxLifetime,
            organicEnergy: this.organicEnergy,
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