import { CommonSimulation } from "./common-simulation";
import { Simulation } from "./simulation";
import { SimulationOptions } from "./types/simulation-options";
import { WorkerSimulation } from "./worker-simulation";

export async function createSimulation(options: SimulationOptions): Promise<Simulation> {
    let simulation: Simulation;

    if (window.Worker) {
        simulation = await WorkerSimulation.create(options);
    } else {
        simulation = new CommonSimulation(options);
    }

    return simulation;
}