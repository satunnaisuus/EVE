import { RendererStore } from "../stores/renderer-store";

const SCALE_BUFFER_SIZE = 40;

export function initMouseInteractions(canvasElement: HTMLCanvasElement, renderer: RendererStore): () => void {
    let dragging = false;
    let moving = false;

    const mousedownListener = (e: MouseEvent) => {
        e.preventDefault();
        dragging = true;
        moving = false;
    }

    const mouseupListener = (e: MouseEvent) => {
        e.preventDefault();

        if (! moving) {
            renderer.click(e.offsetX, e.offsetY);
        }
    }

    const mousemoveListener = (e: MouseEvent) => {
        e.preventDefault();
    }

    let scaleBuffer = 0;

    const wheelListener = (e: WheelEvent) => {
        e.preventDefault();

        scaleBuffer += e.deltaY;

        if (Math.abs(scaleBuffer) < SCALE_BUFFER_SIZE) {
            return;
        }

        scaleBuffer = 0;
        
        const [offsetX, offsetY] = renderer.getOffset();

        const canvasBoundingClientRect = canvasElement.getBoundingClientRect();

        const relativeMousePositionX = e.clientX - Math.trunc(canvasBoundingClientRect.left);
        const relativeMousePositionY = e.clientY - Math.trunc(canvasBoundingClientRect.top);

        const xs = (relativeMousePositionX - offsetX) / renderer.getScale();
        const ys = (relativeMousePositionY - offsetY) / renderer.getScale();

        e.deltaY < 0 ? renderer.scaleUp(false) : renderer.scaleDown(false);

        renderer.setOffset(
            relativeMousePositionX - xs * renderer.getScale(),
            relativeMousePositionY - ys * renderer.getScale()
        );
    }

    const bodyMousemoveListener = (e: MouseEvent) => {
        if (! dragging) {
            return;
        }

        moving = true;

        if (renderer.getPaintMode().isEnabled() && e.buttons === 1) {
            const canvasRect = canvasElement.getBoundingClientRect();
            renderer.paint(e.clientX - canvasRect.x, e.clientY - canvasRect.y);
        } else {
            const [offsetX, offsetY] = renderer.getOffset();
            renderer.setOffset(offsetX + e.movementX, offsetY + e.movementY);
        }
    }

    const bodyMouseupListener = () => {
        dragging = false;
        moving = false;
    }
    
    canvasElement.addEventListener('wheel', wheelListener);
    canvasElement.addEventListener('mousedown', mousedownListener);
    canvasElement.addEventListener('mouseup', mouseupListener);
    canvasElement.addEventListener('mousemove', mousemoveListener);

    document.body.addEventListener('mousemove', bodyMousemoveListener);
    document.body.addEventListener('mouseup', bodyMouseupListener);

    return () => {
        canvasElement.removeEventListener('wheel', wheelListener);
        canvasElement.removeEventListener('mousedown', mousedownListener);
        canvasElement.removeEventListener('mouseup', mouseupListener);
        canvasElement.removeEventListener('mousemove', mousemoveListener);
        
        document.body.removeEventListener('mousemove', bodyMousemoveListener);
        document.body.removeEventListener('mouseup', bodyMouseupListener);
    }
}