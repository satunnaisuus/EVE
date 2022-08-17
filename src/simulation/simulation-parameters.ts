export class SimulationParameters {
    private organismMaxLifetimeValue = 255;

    private photosynthesisEnergyValue = 5;

    private chemosynthesisEnergyValue = 5;

    private mutationProgramRateValue = 25;

    private mutationBaseOrgansRateValue = 10;

    private mutationLimbOrgansRateValue = 0;

    private eatCostValue = 0;

    private attackCostRateValue = 5;

    private armourProtectionRateValue = 50;

    private spineDamageRateValue = 50;

    private divideCostValue = 20;

    private stepCostValue = 1;

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

        if (options['mutationProgramRate'] != null) {
            this.mutationProgramRate = options['mutationProgramRate'];
        }

        if (options['mutationBaseOrgansRate'] != null) {
            this.mutationBaseOrgansRate = options['mutationBaseOrgansRate'];
        }

        if (options['mutationLimbOrgansRate'] != null) {
            this.mutationLimbOrgansRate = options['mutationLimbOrgansRate'];
        }

        if (options['eatCost'] != null) {
            this.eatCost = options['eatCost'];
        }

        if (options['attackCostRate'] != null) {
            this.attackCostRate = options['attackCostRate'];
        }

        if (options['armourProtectionRate'] != null) {
            this.armourProtectionRate = options['armourProtectionRate'];
        }

        if (options['spineDamageRate'] != null) {
            this.spineDamageRate = options['spineDamageRate'];
        }

        if (options['divideCost'] != null) {
            this.divideCost = options['divideCost'];
        }

        if (options['stepCost'] != null) {
            this.stepCost = options['stepCost'];
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

    set mutationProgramRate(value: number) {
        this.mutationProgramRateValue = this.converNumberValue(value, false, 0, 100);
    }

    get mutationProgramRate(): number {
        return this.mutationProgramRateValue;
    }

    set mutationBaseOrgansRate(value: number) {
        this.mutationBaseOrgansRateValue = this.converNumberValue(value, false, 0, 100);
    }

    get mutationBaseOrgansRate(): number {
        return this.mutationBaseOrgansRateValue;
    }

    set mutationLimbOrgansRate(value: number) {
        this.mutationLimbOrgansRateValue = this.converNumberValue(value, false, 0, 100);
    }

    get mutationLimbOrgansRate(): number {
        return this.mutationLimbOrgansRateValue;
    }

    get eatCost(): number {
        return this.eatCostValue;
    }

    set eatCost(value: number) {
        this.eatCostValue = this.converNumberValue(value, false, 0, 255);
    }

    set attackCostRate(value: number) {
        this.attackCostRateValue = this.converNumberValue(value, false, 0, 100);
    }

    get attackCostRate(): number {
        return this.attackCostRateValue;
    }

    set divideCost(value: number) {
        this.divideCostValue = this.converNumberValue(value, false, 0, 255);
    }

    get divideCost(): number {
        return this.divideCostValue;
    }

    set spineDamageRate(value: number) {
        this.spineDamageRateValue = this.converNumberValue(value, false, 0, 100);
    }

    get spineDamageRate(): number {
        return this.spineDamageRateValue;
    }

    set armourProtectionRate(value: number) {
        this.armourProtectionRateValue = this.converNumberValue(value, false, 0, 100);
    }

    get armourProtectionRate(): number {
        return this.armourProtectionRateValue;
    }

    set stepCost(value: number) {
        this.stepCostValue = this.converNumberValue(value, false, 0, 255);
    }

    get stepCost(): number {
        return this.stepCostValue;
    }

    serialize(): any {
        return {
            photosynthesisEnergy: this.photosynthesisEnergy,
            chemosynthesisEnergy: this.chemosynthesisEnergy,
            organismMaxLifetime: this.organismMaxLifetime,
            mutationProgramRate: this.mutationProgramRate,
            mutationBaseOrgansRate: this.mutationBaseOrgansRate,
            mutationLimbOrgansRate: this.mutationLimbOrgansRate,
            eatCost: this.eatCost,
            attackCostRate: this.attackCostRate,
            divideCost: this.divideCost,
            spineDamageRate: this.spineDamageRate,
            armourProtectionRate: this.armourProtectionRate,
            stepCost: this.stepCost,
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