import Neuron from "./neuron";

export default class Connection {
    constructor(
        private from: Neuron,
        private to: Neuron,
        private weight: number
    ) {

    }

    public getFrom(): Neuron {
        return this.from;
    }

    public getTo(): Neuron {
        return this.to;
    }

    public getWeight(): number {
        return this.weight;
    }

    public setWeight(weight: number): void {
        this.weight = weight;
    }

    public getOutput(): number {
        return this.from.getOutput() * this.weight;
    }
}