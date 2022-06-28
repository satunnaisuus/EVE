import { AbstractCell } from "../../abstract-cell";
import { OrganicCell } from "../organic-cell";
import { OrganismAction, randomAction } from "./action";
import { OrganismCell } from "../organism-cell";
import { WallCell } from "../wall-cell";
import { Network } from "../../../../neuro/network";
import { createRNN } from "../../../../neuro/rnn-factory";
import { randomInt } from "../../../../common/random";
import { Color } from "../../../../common/color";

const MUTATION_POWER = 0.5;
const MUTATION_CHANCE = 10;
const DIVIDE_LIMIT = 60;
const SIMILARITY_LIMIT = 30;

enum Target {
    EMPTY = 'EMPTY',
    WALL = 'WALL',
    ORGANIC = 'ORGANIC',
    ORGANISM_SIMILAR = 'ORGANISM_SIMILAR',
    ORGANISM_OTHER = 'ORGANISM_OTHER',
}

export class Genome {
    constructor(
        private neuralNetwork: Network,
        private color: Color,
    ) {
        
    }

    getAction(organism: OrganismCell, tagretCell: AbstractCell): OrganismAction {
        const canDivide = organism.getEnergy() >= DIVIDE_LIMIT ? 1 : 0;

        let data: number[];

        if (tagretCell instanceof WallCell) {
            data = [1, 0, 0, 0, 0, canDivide];
        } else if (tagretCell instanceof OrganicCell) {
            data = [0, 1, 0, 0, 0, canDivide];
        } else if (tagretCell instanceof OrganismCell) {
            if (organism.isSimilar(tagretCell)) {
                data = [0, 0, 1, 0, 0, canDivide];
            } else {
                data = [0, 0, 0, 1, 0, canDivide];
            }
        } else {
            data = [0, 0, 0, 0, 1, canDivide];
        }

        const result = this.neuralNetwork.activate(data);
        const max = Math.max(...result);

        switch (result.indexOf(max)) {
            case 0:
                return OrganismAction.STEP;
            case 1:
                return OrganismAction.PHOTOSYNTHESIS;
            case 2:
                return OrganismAction.EAT;
            case 3:
                return OrganismAction.ATTACK;
            case 4:
                return OrganismAction.NOTHING;
            case 5:
                return OrganismAction.ROTATE_RIGHT;
            case 6:
                return OrganismAction.ROTATE_LEFT;
            case 7:
                return OrganismAction.DIVIDE;
        }

        return OrganismAction.NOTHING;
    }

    isSimilar(genome: Genome): boolean {
        const color = genome.getColor();
        const dr = Math.abs(color.getRed() - this.color.getRed());
        const dh = Math.abs(color.getGreen() - this.color.getGreen());
        const db = Math.abs(color.getBlue() - this.color.getBlue());

        return dr + dh + db < SIMILARITY_LIMIT;
    }

    getColor(): Color {
        return this.color;
    }

    clone(): Genome {
        if (MUTATION_CHANCE <= randomInt(0, 100)) {
            return this;
        }

        const network = Network.deserialize(
            this.neuralNetwork.serialize()
        );

        const layers = network.getHiddenLayers();
        layers.push(network.getInputLayer(), network.getOutputLayer());

        const neurons = [];

        for (const layer of layers) {
            neurons.push(...layer.getNeurons())
        }

        const connections = [];

        for (const neuron of neurons) {
            connections.push(...neuron.getConnections())
        }

        const connection = connections[randomInt(0, connections.length - 1)];
        connection.setWeight(connection.getWeight() + (Math.random() > 0.5 ? 1 : -1) * MUTATION_POWER);

        const color = new Color(
            this.color.getRed() + (Math.random() > 0.5 ? 1 : -1) * randomInt(0, 5),
            this.color.getGreen() + (Math.random() > 0.5 ? 1 : -1) * randomInt(0, 5),
            this.color.getBlue() + (Math.random() > 0.5 ? 1 : -1) * randomInt(0, 5)
        );

        return new Genome(network, color);
    }

    static createRandom(): Genome {
        return new Genome(createRNN(6, [8], 8), Color.random());
    }
}