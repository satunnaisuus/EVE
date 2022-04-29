import Neuron from "./neuron";

export default class Layer {
    constructor(
        private id: number,
        private neurons: Neuron[]
    ) {
        
    }

    public activate(data: number[] = null): number[] {
        if (data === null) {
            for(let neuron of this.neurons) {
                neuron.activate();
            }
        } else {
            for(let i = 0; i < data.length; i++) {
                this.neurons[i].activate(data[i]);
            }
        }

        return this.neurons.map(n => n.getOutput());
    }

    public getNeurons(): Neuron[] {
        return this.neurons;
    }

    public serialize(): any {
        return {
            id: this.id,
            neurons: this.neurons.map(n => n.serialize())
        }
    }
}