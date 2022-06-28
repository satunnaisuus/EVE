import { Neuron } from "./neuron";

function getOutput(neuron: Neuron) {
    return neuron.getOutput()
}

export class Layer {
    constructor(
        private id: number,
        private neurons: Neuron[]
    ) {
        
    }

    activate(data: number[] = null): number[] {
        if (data === null) {
            for(let neuron of this.neurons) {
                neuron.activate();
            }
        } else {
            for(let i = 0; i < data.length; i++) {
                this.neurons[i].activate(data[i]);
            }
        }

        return this.neurons.map(getOutput);
    }

    getNeurons(): Neuron[] {
        return this.neurons;
    }

    serialize(): any {
        return {
            id: this.id,
            neurons: this.neurons.map(n => n.serialize())
        }
    }
}