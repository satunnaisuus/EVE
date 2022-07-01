import { CanvasRenderer } from "../stores/canvas-renderer";

const TOUCH_SCALE_BUFFER_LIMIT = 20;

export function initTouchInteractions(canvas: HTMLCanvasElement, renderer: CanvasRenderer): () => void {
    let activeTouches: {[key: string]: [number, number]} = {};
    let scaleBuffer = 0;
    let moving = false;

    const scaling = () => Object.keys(activeTouches).length === 2;

    const getTouchPosition = (touch: Touch): [number, number] => {
        const canvasBoundingClientRect = canvas.getBoundingClientRect();

        return [
            Math.trunc(touch.clientX) - Math.trunc(canvasBoundingClientRect.left),
            Math.trunc(touch.clientY) - Math.trunc(canvasBoundingClientRect.top)
        ];
    };

    const touchstart = (e: TouchEvent) => {
        e.preventDefault();
        
        for (const touch of e.changedTouches) {
            if (! scaling()) {
                activeTouches[touch.identifier] = getTouchPosition(touch);
            }
        }

        if (e.touches.length > 1) {
            moving = true;
        }
    };

    const touchend = (e: TouchEvent) => {
        for (const touch of e.changedTouches) {
            delete activeTouches[touch.identifier];
        }

        if (! moving) {
            renderer.click(...getTouchPosition(e.changedTouches[0]));
        }

        if (Object.keys(activeTouches).length === 0) {
            moving = false;
        }

        scaleBuffer = 0;
    };


    const touchcancel = (e: TouchEvent) => {
        for (const touch of e.changedTouches) {
            delete activeTouches[touch.identifier];
        }

        if (Object.keys(activeTouches).length === 0) {
            moving = false;
        }
        
        scaleBuffer = 0;
    };

    const touchmove = (e: TouchEvent) => {
        e.preventDefault();
        
        moving = true;
        
        const currentActiveTouches = Object.assign({}, activeTouches);
        const [offsetX, offsetY] = renderer.getOffset();

        for (const touch of e.changedTouches) {
            if (! activeTouches[touch.identifier]) {
                continue;
            }

            currentActiveTouches[touch.identifier] = getTouchPosition(touch);

            renderer.setOffset(
                offsetX + (currentActiveTouches[touch.identifier][0] - activeTouches[touch.identifier][0]),
                offsetY + (currentActiveTouches[touch.identifier][1] - activeTouches[touch.identifier][1])
            );
        }

        if (scaling()) {
            const [k1, k2] = Object.keys(activeTouches);
      
            const previousLength = Math.abs(
                Math.hypot(
                    activeTouches[k1][0] - activeTouches[k2][0],
                    activeTouches[k1][1] - activeTouches[k2][1]
                )
            );

            const currentLength = Math.abs(
                Math.hypot(
                    currentActiveTouches[k1][0] - currentActiveTouches[k2][0],
                    currentActiveTouches[k1][1] - currentActiveTouches[k2][1]
                )
            );
      
            if (previousLength > currentLength) {
              scaleBuffer -= previousLength - currentLength;
            } else {
              scaleBuffer += currentLength - previousLength;
            }
        }
      
        if (Math.abs(scaleBuffer) >= TOUCH_SCALE_BUFFER_LIMIT) {
            const [offsetX, offsetY] = renderer.getOffset();
            const [k1, k2] = Object.keys(activeTouches);

            let cx = (activeTouches[k1][0] + activeTouches[k2][0]) / 2;
            let cy = (activeTouches[k1][1] + activeTouches[k2][1]) / 2;

            const xs = Math.round((cx - offsetX) / renderer.getScale());
            const ys = Math.round((cy - offsetY) / renderer.getScale());

            if (scaleBuffer > 0) {
                renderer.setScale(Math.ceil(renderer.getScale() * 1.5), false);
            } else {
                renderer.setScale(Math.floor(renderer.getScale() / 1.5), false);
            }

            renderer.setOffset(
                cx - xs * renderer.getScale(),
                cy - ys * renderer.getScale()
            );

            scaleBuffer = 0;
        }

        activeTouches = currentActiveTouches;
    };

    canvas.addEventListener("touchstart", touchstart, {passive: false});
    canvas.addEventListener("touchend", touchend);
    canvas.addEventListener("touchcancel", touchcancel);
    canvas.addEventListener("touchmove", touchmove, {passive: false});

    return () => {
        canvas.removeEventListener("touchstart", touchstart);
        canvas.removeEventListener("touchend", touchend);
        canvas.removeEventListener("touchcancel", touchcancel);
        canvas.removeEventListener("touchmove", touchmove);
    };
}