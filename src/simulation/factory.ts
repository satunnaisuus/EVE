import { CommonSimulation } from "./common-simulation";
import { Dump, Simulation } from "./simulation";
import { SimulationOptions } from "./types/simulation-options";
import { WorkerSimulation } from "./worker-simulation";

export async function createSimulation(options: SimulationOptions): Promise<Simulation> {
    if (window.Worker) {
        return await WorkerSimulation.create(options);
    }

    return CommonSimulation.create(options);
}

export async function createSimulationFromDump(dump: Dump): Promise<Simulation> {
    if (window.Worker) {
        return await WorkerSimulation.createFromDump(dump);
    }

    return CommonSimulation.createFromDump(dump);
}