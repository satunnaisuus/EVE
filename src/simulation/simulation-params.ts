export class SimulationParams {
    private organismMaxLifetime: number = 100;

    private photosynthesisEnergy: number = 2;

    private organicEnergy: number = 20;

    constructor(options: {[key: string]: any} = {}) {
        const hasValue = (option: string) => options[option] !== null && options[option] !== undefined;

        if (hasValue('photosynthesisEnergy')) {
            this.setPhotosynthesisEnergy(options['photosynthesisEnergy']);
        }

        if (hasValue('organismMaxLifetime')) {
            this.setOrganismMaxLifetime(options['organismMaxLifetime']);
        }

        if (hasValue('organicEnergy')) {
            this.setOrganicEnergy(options['organicEnergy']);
        }
    }

    getOrganicEnergy(): number {
        return this.organicEnergy;
    }

    setOrganicEnergy(value: number): void {
        this.organicEnergy = value;
    }

    getOrganismMaxLifetime(): number {
        return this.organismMaxLifetime;
    }

    setOrganismMaxLifetime(value: number): void {
        this.organismMaxLifetime = value;
    }

    getPhotosynthesisEnergy(): number {
        return this.photosynthesisEnergy;
    }

    setPhotosynthesisEnergy(value: number): void {
        this.photosynthesisEnergy = value;
    }

    serialize(): any {
        return {
            photosynthesisEnergy: this.photosynthesisEnergy,
            organismMaxLifetime: this.organismMaxLifetime,
            organicEnergy: this.organicEnergy,
        };
    }
}