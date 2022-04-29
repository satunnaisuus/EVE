import Connection from "./connection";

export default class Neuron {
    private connections: Connection[] = [];

    private output: number = 0;

    constructor(private id: number) {

    }

    public getId(): number {
        return this.id;
    }

    public connect(neuron: Neuron, weight: number): void {
        this.connections.push(
            new Connection(neuron, this, weight)
        );
    }

    public activate(data: number = null): number {
        if (data !== null) {
            this.output = data;
        } else {
            let result = 0;

            for (let connection of this.connections) {
                result += connection.getOutput();
            }

            this.output = 1 / (1 + Math.E ** -result);
        }

        return this.output;
    }

    public getOutput(): number {
        return this.output;
    }

    public serialize(): any {
        return {
            id: this.id,
            connections: this.connections.map(c => [c.getFrom().getId(), c.getWeight()])
        }
    }
}