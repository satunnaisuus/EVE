import { GridLoopType } from "./grid-loop-type";

export type SimulationOptions = {
    width: number,
    height: number,
    loop: GridLoopType,
    initialEnergy: number,
    population: number,
    lightDepth: number,
    lightGradient: boolean,
    mineralsDepth: number,
    mineralsGradient: boolean,
}