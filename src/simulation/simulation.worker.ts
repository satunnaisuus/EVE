import { CommonSimulation } from "./common-simulation";
import { Simulation } from "./simulation";
import { CommandInit, CommandPause, CommandRequestState, CommandStart, CommandStep, WorkerCommand, WorkerResponse } from "./types/worker-commands";

const ctx: Worker = self as any;

let simulation: Simulation;

const handlers = {
    init: (request: CommandInit) => {
        if (simulation) {
            return;
        }

        simulation = new CommonSimulation(request.options);

        simulation.addEventListener('start', (ev) => ctx.postMessage({type: 'start'}));
        simulation.addEventListener('pause', (ev) => ctx.postMessage({type: 'pause'}));
        simulation.addEventListener('step', (ev) => ctx.postMessage({type: 'step', step: ev.step}));
        simulation.addEventListener('state', (ev) => ctx.postMessage({
            type: 'state',
            step: ev.step,
            buffer: ev.buffer,
            payload: ev.payload,
        }, [ev.buffer]));

        ctx.postMessage({type: 'init'});
    },
    start: (request: CommandStart) => {
        simulation.start();
    },
    pause: (request: CommandPause) => {
        simulation.pause();
    },
    step: (request: CommandStep) => {
        simulation.step();
    },
    requestState: (request: CommandRequestState) => {
        simulation.requestState(request.payload);
    }
}

ctx.addEventListener("message", (event: MessageEvent<WorkerCommand>) => {
    switch (event.data.type) {
        case 'init':
            return handlers.init(event.data);
        case 'start':
            return handlers.start(event.data);
        case 'pause':
            return handlers.pause(event.data);
        case 'step':
            return handlers.step(event.data);
        case 'requestState':
            return handlers.requestState(event.data);
    }
});