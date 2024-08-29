
export function drawLineThroughPoint(x, y) {
    // draws a line across the whole canvas through a point
    canvas.drawLine();
}

export const clone = structuredClone;

export const round = Math.round;
export const roundToRatio = x => {
    return round(x * canvas.pixelRatio) / canvas.pixelRatio
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
