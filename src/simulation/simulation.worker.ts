import { CommonSimulation } from "./common-simulation";
import { Simulation } from "./simulation";
import { CommandFindCellById, CommandGetCell, CommandGetOrganismsCount, CommandInit, CommandReplace, CommandRequestState, CommandSetParameter, CommandMakeStep, WorkerCommand, CommandDump, CommandGetParameters } from "./types/worker-commands";

const ctx: Worker = self as any;

let simulation: Simulation;

const handlers = {
    init: (request: CommandInit) => {
        if (simulation) {
            return;
        }

        if (request.dump) {
            simulation = CommonSimulation.createFromDump(request.dump);
        } else {
            simulation = CommonSimulation.create(request.options);
        }

        

        ctx.postMessage({type: 'init'});
    },

    makeStep: (request: CommandMakeStep) => {
        simulation.makeStep().then((step) => {
            ctx.postMessage({type: 'makeStep', step: step, id: request.id})
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

    setParameter: (request: CommandSetParameter) => {
        simulation.setParameter(request.parameter, request.value).then((value) => {
            ctx.postMessage({
                id: request.id,
                type: 'setParameter',
                value: value,
            });
        });
    },

    getOrganismsCount: (request: CommandGetOrganismsCount) => {
        simulation.getOrganismsCount().then((count) => {
            ctx.postMessage({
                id: request.id,
                type: 'getOrganismsCount',
                count: count,
            });
        });
    },

    getCell: (request: CommandGetCell) => {
        simulation.getCell(request.x, request.y).then((cell) => {
            ctx.postMessage({
                id: request.id,
                type: 'getCell',
                cell: cell,
            });
        });
    },

    findCellById: (request: CommandFindCellById) => {
        simulation.findCellById(request.cellId).then((cell) => {
            ctx.postMessage({
                id: request.id,
                type: 'findCellById',
                cell: cell,
            });
        });
    },

    replace: (request: CommandReplace) => {
        simulation.replace(request.coords, request.cellType, request.ignore, request.options).then(() => {
            ctx.postMessage({
                id: request.id,
                type: 'replace',
            });
        });
    },

    dump: (request: CommandDump) => {
        simulation.dump().then((dump) => {
            ctx.postMessage({
                id: request.id,
                type: 'dump',
                dump: dump,
            });
        });
    },

    getParameters: (request: CommandGetParameters) => {
        simulation.getParameters().then((parameters) => {
            ctx.postMessage({
                id: request.id,
                type: 'getParameters',
                parameters: parameters,
            });
        });
    },
}

ctx.addEventListener("message", (event: MessageEvent<WorkerCommand>) => {
    handlers[event.data.type as keyof typeof handlers](event.data as any);
});