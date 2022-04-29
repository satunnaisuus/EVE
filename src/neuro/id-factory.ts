export default class IdFactory {
    private id: number = 1;

    next() {
        return this.id++;
    }
}