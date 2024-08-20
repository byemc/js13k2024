
import Canvas from "../../hampsterengine/src/canvas.js";
import Engine from "../../hampsterengine/src/engine.js";

import SoundBox from "./sb-player-small";
// import {mus_DEMOSONG} from "./songs/DEMOSONGDONOTCOMMIT";

// dependencies used for debugging. comment out code that uses this and they won't be included
// import Stats from "stats.js";

// Images
import font from "../img/font.webp";

// Rooms
import {rm_mainMenu} from "./rooms/mainMenu";
import {rm_game} from "./rooms/game";
import {rm_DEBUG_button} from "./rooms/debug_button";
import {rm_DEBUG_mouse} from "./rooms/debug_mouse";
import {rm_DEBUG_music} from "./rooms/debug_music";
import {rm_DEBUG_INCURSION} from "./rooms/debug_incursion";
import {rm_DEBUG_text} from "./rooms/debug_text";
import Mouse from "../../hampsterengine/src/mouse";
import {FontRenderer} from "./objects";

// Music
// There is none

// Init the engine and canvas
const canvas = new Canvas('canvas');
const engine = new Engine(canvas);
const assets = engine.assetStore;
assets.addImage('font', font);

const fontRenderer = new FontRenderer(assets.get('font'));
window.fR = fontRenderer
// const mouse = new Mouse(engine);
// window.mouse = mouse;

canvas.width = 256*4;
canvas.height = 240*4;
canvas.pixelRatio = 4;
canvas.ctx.setTransform(canvas.pixelRatio, 0, 0, canvas.pixelRatio, 0, 0);
canvas.ctx.imageSmoothingEnabled = false;

engine.running = false; // Game uses this as a pause state actually

// Parse query parameters
const query = new URLSearchParams(window.location.search);

engine.registerRoom(rm_mainMenu, 'mainMenu');
engine.registerRoom(rm_game, 'game');

// engine.registerRoom(rm_DEBUG_button, 'debug_button');
// engine.registerRoom(rm_DEBUG_mouse, 'debug_mouse');
// engine.registerRoom(rm_DEBUG_music, 'debug_music');
engine.registerRoom(rm_DEBUG_INCURSION, 'debug_incursion');
engine.registerRoom(rm_DEBUG_text, 'debug_text');

// Init stats.js
// const stats = new Stats();
// stats.showPanel(0);
// document.body.appendChild( stats.dom );

function main() {
    try {
        // stats.begin();
        engine.frames++;
        canvas.fill(engine.room.bgColor ?? 'black');

        engine.step();
        engine.draw();
        engine.drawGui();

        // engine.drawCursor();

        // stats.end();

        // Ask to run at the next frame
        requestAnimationFrame(main);
    } catch (e) {
        engine.running = false;

        canvas.pixelRatio = 2;
        canvas.ctx.setTransform(canvas.pixelRatio, 0, 0, canvas.pixelRatio, 0, 0);
        canvas.fill('#a05555d0');

        const logo = assets.get('splash')
        canvas.drawImage(logo, 10, 10, logo.width, logo.height)

        canvas.setFillColor('black');
        canvas.drawText(e, 5, canvas.height-5, {
            maxWidth: canvas.width-10,
            textBaseline: 'bottom'
        });

        throw e;
    }
}

function physicsTick() {
    if (!engine.running) return; // Paused
    // Tell every object to process physics
    for (let thing of engine.room.entities) {
        thing.physicsTick();
    }
}

console.debug(engine.rooms);

if (query.get('room')) {
    console.log('Requesting room', query.get('room'));
    engine.loadDelay = 0;
    engine.room = engine.getRoomIndex(query.get('room'));
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
        setInterval(physicsTick, 1000/60); // Update physics 60 times a second
    }
}

load();
