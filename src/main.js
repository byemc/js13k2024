
import Canvas from "../hampsterengine/src/canvas.js";
import Engine from "../hampsterengine/src/engine.js";

const canvas = new Canvas('canvas');
const engine = new Engine(canvas);

function main() {
    requestAnimationFrame(main);
    canvas.updateCanvasSize();
}

function load() {
    if (engine.loading) {
        engine.loadLoop();
        setTimeout(load, 1000/60);
    } else {
        main();
    }
}

load();
