import { Data, PayloadData } from "../simulation/data";
import { CommonRenderer } from "./common-renderer";
import { RenderMode } from "./renderer";

interface RenderCommand {
    id: number,
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
    scale: number,
    mode: RenderMode,
    data: {
        width: number,
        height: number,
        payload: PayloadData,
        array: Uint8Array,
    }
}

const ctx: Worker = self as any;
const renderer = new CommonRenderer();
let queue: RenderCommand[] = [];

setTimeout(function run () {
    if (queue.length) {
        const commandData = queue.pop();
        queue = [];
        const simulationData = new Data(commandData.data.array, commandData.data.payload, commandData.data.width, commandData.data.height);
        renderer.render(
            commandData.width,
            commandData.height,
            commandData.offsetX,
            commandData.offsetY,
            commandData.scale,
            commandData.mode,
            simulationData
        ).then(function (data) {
            ctx.postMessage({id: commandData.id, data: data}, [data.data.buffer])
        })
    }

    setTimeout(run, 0);
}, 0);

ctx.addEventListener("message", (event: MessageEvent<RenderCommand>) => {
    queue.push(event.data);
});