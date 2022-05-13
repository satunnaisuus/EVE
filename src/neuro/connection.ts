import { Neuron } from "./neuron";

export class Connection {
    constructor(
        private from: Neuron,
        private to: Neuron,
        private weight: number
    ) {

    }

    getFrom(): Neuron {
        return this.from;
    }

    getTo(): Neuron {
        return this.to;
    }

    getWeight(): number {
        return this.weight;
    }

    setWeight(weight: number): void {
        this.weight = weight;
    }

    getOutput(): number {
        return this.from.getOutput() * this.weight;
    }
}