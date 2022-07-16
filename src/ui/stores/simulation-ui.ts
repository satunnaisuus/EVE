import { makeObservable, observable, action } from "mobx";

export type SidebarTab = 'cell' | 'parameters';

export class SimulationUI {
    @observable
    private activeTab: SidebarTab = null;

    @observable
    private infoOpened: boolean = false;

    constructor() {
        makeObservable(this);
    }

    getActiveTab(): SidebarTab {
        return this.activeTab;
    }

    isTabActive(tab: SidebarTab): boolean {
        return this.activeTab === tab;
    }

    @action
    toggleTab(tab: SidebarTab): void {
        if (this.activeTab === tab) {
            this.activeTab = null;
        } else {
            this.activeTab = tab;
        }
    }

    @action
    setActiveTab(tab: SidebarTab): void {
        this.activeTab = tab;
    }

    @action
    closeTab(): void {
        this.activeTab = null;
    }

    isInfoOpened(): boolean {
        return this.infoOpened;
    }

    @action
    setInfoOpened(opened: boolean): void {
        this.infoOpened = opened;
    }
}