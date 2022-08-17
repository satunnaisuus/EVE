import { AbstractOrgan } from "../abstract-organ";

export class Fermenter extends AbstractOrgan {
    use(): boolean {
        return false;
    }

    sense(): boolean {
        return false;
    }
}