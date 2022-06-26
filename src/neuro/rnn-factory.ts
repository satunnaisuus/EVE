import { IdFactory } from "./id-factory";
import { Layer } from "./layer";
import { Network } from "./network";
import { Neuron } from "./neuron";

function connectLayers(input: Layer, hidden: Layer[], output: Layer): void {
    let lastLayer = input;

    for (let layer of hidden) {
        connectNeurons(lastLayer.getNeurons(), layer.getNeurons());
        lastLayer = layer;
    }

    connectNeurons(lastLayer.getNeurons(), output.getNeurons())
}

function connectNeurons(from: Neuron[], to: Neuron[]): void {
    for (let neuronTo of to) {
        for (let neuronFrom of from) {
            neuronTo.connect(neuronFrom, Math.random());
        }
    }
}

function connectRequrent(hidden: Layer[]): void {
    for (const layer of hidden) {
        const neurons = layer.getNeurons();

        for (let i = 0; i < neurons.length - 1; i++) {
            connectNeurons([neurons[i]], [neurons[i + 1]]);
            connectNeurons([neurons[i + 1]], [neurons[i]]);
        }
    }
}

export function createRNN(inputNeuroneCount: number, hiddenLayersCounts: number[], outputNeuroneCount: number): Network {
    const neuroneIdFactory = new IdFactory();
    const layerIdFactory = new IdFactory();

    const hiddenLayers: Layer[] = [];

    const inputNeurons: Neuron[] = [];
    const outputNeurons: Neuron[] = [];

    for (let i = 0; i < inputNeuroneCount; i++) {
        inputNeurons.push(new Neuron(neuroneIdFactory.next()));
    }

    const inputLayer = new Layer(layerIdFactory.next(), inputNeurons);

    for (let count of hiddenLayersCounts) {
        const neurons: Neuron[] = [];

        for (let i = 0; i < count; i++) {
            neurons.push(new Neuron(neuroneIdFactory.next()));
        }

        hiddenLayers.push(new Layer(layerIdFactory.next(), neurons));
    }

    for (let i = 0; i < outputNeuroneCount; i++) {
        outputNeurons.push(new Neuron(neuroneIdFactory.next()));
    }

    const outputLayer = new Layer(layerIdFactory.next(), outputNeurons);

    connectLayers(inputLayer, hiddenLayers, outputLayer);
    connectRequrent(hiddenLayers);

    return new Network(inputLayer, hiddenLayers, outputLayer);
}