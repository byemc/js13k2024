
export function drawLineThroughPoint(x, y) {
    // draws a line across the whole canvas through a point
    canvas.drawLine();
}

export const clone = structuredClone;

export const GRAVITY_X = 0; // I don't think we're going to use X gravity but i'm going to keep in the source in case i do
export const GRAVITY_Y = 450; // Per second

export const round = Math.round;
export const roundToRatio = x => {
    return round(x * canvas.pixelRatio * canvas.scale) / canvas.pixelRatio / canvas.scale
}

export const easeOutCubic = (x) => {
    return 1 - Math.pow(1 - x, 3);
}

export const easeOutSine = (x) => {
    return Math.sin((x * Math.PI) / 2);

}

export const abs = Math.abs;

export function mulberry32(a) {
    return function() {
        let t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

export const clonePlayer = player => {
    return player;
}
