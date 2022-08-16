import { Parameter } from "../simulation";

export type SimulationParameters = {
    [key in Parameter]: number
}