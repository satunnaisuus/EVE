import { CommonSimulation } from "./common-simulation";
import { Simulation } from "./simulation";
import { WorkerCommand } from "./types/worker-commands";

const ctx: Worker = self as unknown as Worker;

let simulation: Simulation;

ctx.addEventListener("message", (event: MessageEvent<WorkerCommand>) => {
    const request = event.data;

    switch (request.type) {
        case 'init': {
            if (simulation) {
                return;
            }
    
            if (request.dump) {
                simulation = CommonSimulation.createFromDump(request.dump);
            } else {
                simulation = CommonSimulation.create(request.options);
            }
    
            ctx.postMessage({type: 'init'});

            return;
        }
            
        case 'makeStep': {
            simulation.makeStep().then((step) => {
                ctx.postMessage({type: 'makeStep', step: step, id: request.id})
            });

            return;
        }
        
        case 'requestState': {
            simulation.getState(request.payload).then((data) => {
                ctx.postMessage({
                    id: request.id,
                    type: 'state',
                    step: data.step,
                    buffer: data.buffer,
                    payload: data.payload,
                }, [data.buffer]);
            });

            return;
        }

        case 'setParameter': {
            simulation.setParameter(request.parameter, request.value).then((value) => {
                ctx.postMessage({
                    id: request.id,
                    type: 'setParameter',
                    value: value,
                });
            });

            return;
        }

        case 'getOrganismsCount': {
            simulation.getOrganismsCount().then((count) => {
                ctx.postMessage({
                    id: request.id,
                    type: 'getOrganismsCount',
                    count: count,
                });
            });

            return;
        }

        case 'getCell': {
            simulation.getCell(request.x, request.y).then((cell) => {
                ctx.postMessage({
                    id: request.id,
                    type: 'getCell',
                    cell: cell,
                });
            });

            return;
        }

        case 'findCellById': {
            simulation.findCellById(request.cellId).then((cell) => {
                ctx.postMessage({
                    id: request.id,
                    type: 'findCellById',
                    cell: cell,
                });
            });

            return;
        }

        case 'replace': {
            simulation.replace(request.coords, request.cellType, request.ignore, request.options).then(() => {
                ctx.postMessage({
                    id: request.id,
                    type: 'replace',
                });
            });

            return;
        }

        case 'dump': {
            simulation.dump().then((dump) => {
                ctx.postMessage({
                    id: request.id,
                    type: 'dump',
                    dump: dump,
                });
            });

            return;
        }

        case 'getParameters': {
            simulation.getParameters().then((parameters) => {
                ctx.postMessage({
                    id: request.id,
                    type: 'getParameters',
                    parameters: parameters,
                });
            });

            return;
        }
    }
});