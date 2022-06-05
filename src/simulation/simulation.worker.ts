import { CommonSimulation } from "./common-simulation";
import { Simulation } from "./simulation";
import { CommandInit, CommandRequestState, CommandSetParameter, CommandStep, WorkerCommand } from "./types/worker-commands";

const ctx: Worker = self as any;

let simulation: Simulation;

const handlers = {
    init: (request: CommandInit) => {
        if (simulation) {
            return;
        }

        simulation = new CommonSimulation(request.options);

        ctx.postMessage({type: 'init'});
    },

    step: (request: CommandStep) => {
        simulation.step().then((step) => {
            ctx.postMessage({type: 'step', step: step, id: request.id})
        });
    },

    requestState: (request: CommandRequestState) => {
        simulation.getState(request.payload).then((data) => {
            ctx.postMessage({
                id: request.id,
                type: 'state',
                step: data.step,
                buffer: data.buffer,
                payload: data.payload,
            }, [data.buffer]);
        });
    },

    setPatameter: (request: CommandSetParameter) => {
        simulation.setParameter(request.parameter, request.value).then((value) => {
            ctx.postMessage({
                id: request.id,
                type: 'setParameter',
                value: value,
            });
        });
    }
}

ctx.addEventListener("message", (event: MessageEvent<WorkerCommand>) => {
    switch (event.data.type) {
        case 'init':
            return handlers.init(event.data);
        case 'step':
            return handlers.step(event.data);
        case 'requestState':
            return handlers.requestState(event.data);
        case 'setParameter':
            return handlers.setPatameter(event.data);
    }
});