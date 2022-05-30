import { CanvasRenderer } from "../stores/canvas-renderer";

export function initMouseInteractions(canvas: HTMLCanvasElement, renderer: CanvasRenderer): () => void {
    let moving = false;
    let movingStart = [0, 0];

    const wheelListener = (e: WheelEvent) => {
        const [offsetX, offsetY] = renderer.getOffset();

        const xs = Math.round((e.clientX - offsetX) / renderer.getScale());
        const ys = Math.round((e.clientY - offsetY) / renderer.getScale());

        e.deltaY < 0 ? renderer.scaleUp() : renderer.scaleDown();

        renderer.setOffset(
            e.clientX - xs * renderer.getScale(),
            e.clientY - ys * renderer.getScale()
        );
    }

    const mousedownListener = (e: MouseEvent) => {
        e.preventDefault();
        moving = true;
        movingStart = [e.clientX, e.clientY];
    }

    const mouseupListener = (e: MouseEvent) => {
        moving = false;
    }

    const mousemoveListener = (e: MouseEvent) => {
        e.preventDefault();

        if (! moving) {
            return;
        }

        const [offsetX, offsetY] = renderer.getOffset();

        renderer.setOffset(
            offsetX + e.clientX - movingStart[0],
            offsetY + e.clientY - movingStart[1]
        );

        movingStart = [e.clientX, e.clientY];
    }

    const mouseleaveListener = (e: MouseEvent) => {
        moving = false;
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