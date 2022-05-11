import { makeObservable, observable, action } from "mobx";

export class UIStore {
    @observable
    private optionsFormOpened: boolean = false;

    constructor() {
        makeObservable(this);
    }

    getOptionsFormOpened(): boolean {
        return this.optionsFormOpened;
    }

    @action
    setOptionsFormOpened(value: boolean): void {
        this.optionsFormOpened = value;
    }
}