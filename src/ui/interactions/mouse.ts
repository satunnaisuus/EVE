import { CanvasRenderer } from "../stores/canvas-renderer";

const SCALE_BUFFER_SIZE = 40;

export function initMouseInteractions(canvas: HTMLCanvasElement, renderer: CanvasRenderer): () => void {
    let dragging = false;

    const mousedownListener = (e: MouseEvent) => {
        e.preventDefault();
        dragging = true;
    }

    const mousemoveListener = (e: MouseEvent) => {
        e.preventDefault();

        if (! dragging) {
            return;
        }

        const [offsetX, offsetY] = renderer.getOffset();

        renderer.setOffset(
            offsetX + e.movementX,
            offsetY + e.movementY
        );
    }

    const mouseupListener = () => {
        dragging = false;
    }

    const mouseleaveListener = () => {
        dragging = false;
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

        const canvasBoundingClientRect = canvas.getBoundingClientRect();

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
    
    canvas.addEventListener('wheel', wheelListener);
    canvas.addEventListener('mousedown', mousedownListener);
    canvas.addEventListener('mouseup', mouseupListener);
    canvas.addEventListener('mousemove', mousemoveListener);
    canvas.addEventListener('mouseleave', mouseleaveListener);

    return () => {
        canvas.removeEventListener('wheel', wheelListener);
        canvas.removeEventListener('mousedown', mousedownListener);
        canvas.removeEventListener('mouseup', mouseupListener);
        canvas.removeEventListener('mousemove', mousemoveListener);
        canvas.removeEventListener('mouseleave', mouseleaveListener);
    }
}