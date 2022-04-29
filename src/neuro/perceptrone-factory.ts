import Connection from "./connection";
import IdFactory from "./id-factory";
import Layer from "./layer";
import Network from "./network";
import Neuron from "./neuron";

export default class PerceptroneFactory {
    constructor() {

    }

    create(inputNeuroneCount: number, hiddenLayersCounts: number[], outputNeuroneCount: number): Network {
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

        this.connectLayers(inputLayer, hiddenLayers, outputLayer);

        return new Network(inputLayer, hiddenLayers, outputLayer);
    }

    private connectLayers(input: Layer, hidden: Layer[], output: Layer) {
        let lastLayer = input;

        for (let layer of hidden) {
            this.connectNeurons(lastLayer.getNeurons(), layer.getNeurons());
            lastLayer = layer;
        }

        this.connectNeurons(lastLayer.getNeurons(), output.getNeurons())
    }

    private connectNeurons(from: Neuron[], to: Neuron[]) {
        for (let neuronTo of to) {
            for (let neuronFrom of from) {
                neuronTo.connect(neuronFrom, Math.random());
            }
        }
    }
}