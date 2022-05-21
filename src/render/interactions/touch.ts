import { CanvasRenderer } from "../canvas-renderer";

const TOUCH_SCALE_BUFFER_LIMIT = 20;

export function initTouchInteractions(canvas: HTMLCanvasElement, renderer: CanvasRenderer): () => void {
    let activeTouches: {[key: string]: Touch} = {};
    let scaleBuffer = 0;
    const scaling = () => Object.keys(activeTouches).length === 2;

    const touchstart = (e: TouchEvent) => {
        e.preventDefault();
        
        for (const touch of e.changedTouches) {
            if (! scaling()) {
                activeTouches[touch.identifier] = touch;
            }
        }
    };

    const touchend = (e: TouchEvent) => {
        for (const touch of e.changedTouches) {
            delete activeTouches[touch.identifier];
        }

        scaleBuffer = 0;
    };


    const touchcancel = (e: TouchEvent) => {
        for (const touch of e.changedTouches) {
            delete activeTouches[touch.identifier];
        }
        
        scaleBuffer = 0;
    };


    const touchmove = (e: TouchEvent) => {
        e.preventDefault();
        
        const currentActiveTouches = Object.assign({}, activeTouches);
        const [offsetX, offsetY] = renderer.getOffset();

        for (const touch of e.changedTouches) {
            if (! activeTouches[touch.identifier]) {
                continue;
            }

            currentActiveTouches[touch.identifier] = touch;

            renderer.setOffset(
                offsetX + Math.ceil(touch.clientX - activeTouches[touch.identifier].clientX),
                offsetY + Math.ceil(touch.clientY - activeTouches[touch.identifier].clientY)
            );
        }

        if (scaling()) {
            const [k1, k2] = Object.keys(activeTouches);
      
            const previousLength = Math.abs(
                Math.hypot(
                    activeTouches[k1].clientX - activeTouches[k2].clientX,
                    activeTouches[k1].clientY - activeTouches[k2].clientY
                )
            );

            const currentLength = Math.abs(
                Math.hypot(
                    currentActiveTouches[k1].clientX - currentActiveTouches[k2].clientX,
                    currentActiveTouches[k1].clientY - currentActiveTouches[k2].clientY
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

            let cx = (activeTouches[k1].clientX + activeTouches[k2].clientX) / 2;
            let cy = (activeTouches[k1].clientY + activeTouches[k2].clientY) / 2;

            const xs = Math.round((cx - offsetX) / renderer.getScale());
            const ys = Math.round((cy - offsetY) / renderer.getScale());

            renderer.setScale(renderer.getScale() + Math.trunc(scaleBuffer / TOUCH_SCALE_BUFFER_LIMIT));

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
    canvas.addEventListener("touchmove", touchcancel, {passive: false});

    return () => {
        canvas.removeEventListener("touchstart", touchstart);
        canvas.removeEventListener("touchend", touchend);
        canvas.removeEventListener("touchcancel", touchcancel);
        canvas.removeEventListener("touchmove", touchcancel);
    };
}