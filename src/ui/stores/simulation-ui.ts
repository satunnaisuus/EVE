import { makeObservable, observable, action } from "mobx";

export enum SimulationTabType {
    PARAMETERS = 'PARAMETERS',
    INFO = 'INFO',
    CELL = 'CELL',
}

export class SimulationUI {
    @observable
    private openedTab: SimulationTabType = null;

    constructor() {
        makeObservable(this);
    }

    getOpenedTab(): SimulationTabType {
        return this.openedTab;
    }

    @action
    openTab(tab: SimulationTabType): void {
        this.openedTab = tab;
    }

    @action
    closeTab(): void {
        this.openedTab = null;
    }
}