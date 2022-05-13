import { Layer } from "./layer";
import { Neuron } from "./neuron";

type SerializedConnection = [number, number]

type SerializedNeuron = {
    id: number,
    connections: SerializedConnection[]
}

type SerializedLayout = {
    id: number,
    neurons: SerializedNeuron[]
}

type SerializedNetwork = {
    input: SerializedLayout,
    hidden: SerializedLayout[],
    output: SerializedLayout
}

export class Network {
    constructor(
        private input: Layer,
        private hidden: Layer[],
        private output: Layer
    ) {
        
    }

    activate(data: number[]): number[] {
        this.input.activate(data);

        for (let layer of this.hidden) {
            layer.activate();
        }

        return this.output.activate();
    }

    serialize(): SerializedNetwork {
        return {
            input: this.input.serialize(),
            hidden: this.hidden.map(l => l.serialize()),
            output: this.output.serialize(),
        }
    }

    static deserialize(value: SerializedNetwork): any {
        const neuronsMap: {[key: number]: Neuron} = {};
        const connectionsConfigMap: {[key: number]: SerializedConnection[]} = {};

        const deserializeNeurons = (data: SerializedNeuron[]) => {
            return data.map(n => {
                const neuron = new Neuron(n.id);

                neuronsMap[n.id] = neuron;
                connectionsConfigMap[n.id] = n.connections;

                return neuron;
            });
        };

        const inputLayer = new Layer(value.input.id, deserializeNeurons(value.input.neurons));
        const hiddenLayers = value.hidden.map(l => new Layer(l.id, deserializeNeurons(l.neurons)));
        const outputLayer = new Layer(value.input.id, deserializeNeurons(value.output.neurons));

        for (let id in neuronsMap) {
            for (let connectionConfig of connectionsConfigMap[id]) {
                neuronsMap[id].connect(neuronsMap[connectionConfig[0]], connectionConfig[1]);
            }
        }

        return new Network(inputLayer, hiddenLayers, outputLayer);
    }
}