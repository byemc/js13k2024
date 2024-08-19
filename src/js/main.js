
import Canvas from "../../hampsterengine/src/canvas.js";
import Engine from "../../hampsterengine/src/engine.js";

import SoundBox from "./sb-player-small";
// import {mus_DEMOSONG} from "./songs/DEMOSONGDONOTCOMMIT";

// Rooms
import {rm_mainMenu} from "./rooms/mainMenu";
import {rm_game} from "./rooms/game";
import {rm_DEBUG_button} from "./rooms/debug_button";
import {rm_DEBUG_mouse} from "./rooms/debug_mouse";
import {rm_DEBUG_music} from "./rooms/debug_music";
import {rm_DEBUG_INCURSION} from "./rooms/debug_incursion";

// Music

const canvas = new Canvas('canvas');
const engine = new Engine(canvas);
const assets = engine.assetStore;

// assets.addSoundBoxAudio('mus_DEMO', mus_DEMOSONG, new SoundBox());

canvas.width = 640;
canvas.height = 480;
canvas.pixelRatio = 2;
canvas.ctx.setTransform(canvas.pixelRatio, 0, 0, canvas.pixelRatio, 0, 0);
canvas.ctx.imageSmoothingEnabled = false;

let lastClickPos = {
    x: 0, y: 0
}

window.lastClickPos = lastClickPos;

engine.registerRoom(rm_mainMenu, 'mainMenu');
engine.registerRoom(rm_game, 'game');

//Debug rooms. Comment out to not include in build (esbuild will not import them if they arent used)
engine.registerRoom(rm_DEBUG_button, 'debug_button');
engine.registerRoom(rm_DEBUG_mouse, 'debug_mouse');
engine.registerRoom(rm_DEBUG_music, 'debug_music');
engine.registerRoom(rm_DEBUG_INCURSION, 'debug_incursion')

function main() {
    requestAnimationFrame(main);
    engine.frames++;
    canvas.fill(engine.room.bgColor ?? 'black');

    engine.step();
    engine.draw();
    engine.drawGui();

    engine.drawCursor();
}

console.debug(engine.rooms);

if (document.location.hash) {
    console.log('Requesting room', document.location.hash.substring(1));
    engine.loadDelay = 0;
    engine.room = engine.getRoomIndex(document.location.hash.substring(1));
} else {
    engine.room = engine.getRoomIndex('mainMenu');
}

// Ensure assets are loaded.
function load() {
    if (engine.loading) {
        engine.loadLoop();
        setTimeout(load, 1000/60);
    } else {
        main();
    }
}

load();
