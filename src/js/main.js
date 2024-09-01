
import Canvas from "../../hampsterengine/src/canvas.js";
import Engine from "../../hampsterengine/src/engine.js";
import Keyboard from "../../hampsterengine/src/keyboard";
import {FontRenderer, Stars} from "./objects";

// Init the engine and canvas
const canvas = new Canvas(c);
const engine = new Engine(canvas);
const assets = engine.assetStore;
const keyboard = new Keyboard();

import SoundBox from "./sb-player-small";
// import {mus_DEMOSONG} from "./songs/DEMOSONGDONOTCOMMIT";

// dependencies used for debugging. comment out code that uses this and they won't be included
// import Stats from "stats.js";

// Images
import font from "../img/font.webp";

// Rooms
import {rm_mainMenu} from "./rooms/mainMenu";
import {rm_game} from "./rooms/game";
// import {rm_DEBUG_button} from "./rooms/debug_button";
// import {rm_DEBUG_mouse} from "./rooms/debug_mouse";
// import {rm_DEBUG_music} from "./rooms/debug_music";
import {rm_DEBUG_INCURSION} from "./rooms/debug_incursion";
import {rm_DEBUG_text} from "./rooms/debug_text";
import {rm_DEBUG_stars} from "./rooms/debug_stars";
import {rm_DEBUG_sprites} from "./rooms/debug_sprites";

// Music
// There is none

// Parse query parameters
const query = new URLSearchParams(window.location.search);
window.query = query;

assets.addImage('font', font);

const fontRenderer = new FontRenderer(assets.get`font`);
window.fR = fontRenderer
// const mouse = new Mouse(engine);
// window.mouse = mouse;

engine.debug = query.get`debug`;
window.debug = engine.debug;

canvas.width = 256;
canvas.height = 240;

canvas.setScale();
canvas.ctx.imageSmoothingEnabled = false;

const floor = Math.floor;
const u = _=> {
    const w = innerWidth;
    const h = innerHeight;
    const wS = floor(w/256);
    const hS = floor(h/240);
    const s=Math.min(wS,hS);
    canvas.width = 256*s;
    canvas.height= 240*s;
    canvas.pixelRatio = s;
    canvas.setScale(canvas.scale);
    canvas.ctx.imageSmoothingEnabled = false;
}
u();addEventListener('resize', u, !0);

engine.running = false; // Game uses this as a pause state actually

// // Prerender the stars
// const tempCanvasStars = document.createElement("canvas");
// tempCanvasStars.width = 2560;
// tempCanvasStars.height = 2400;
// const stars = new Stars(tempCanvasStars);
// window.starsTest = stars;
// stars.draw(0, 0, 2560, 2400);
// const createStarsObjectURL = blob => {
//     assets.addImage('stars', URL.createObjectURL(blob));
// }
// tempCanvasStars.toBlob(createStarsObjectURL);

const GROUND_PALETTE = ['#2a6', '#964', '#853']
assets.addMiniSprite('grass', 'IIIIIIQIQQQJZQZZRZRRZRZRSSRSRZZR', 8, GROUND_PALETTE);
assets.addMiniSprite('dirt', 'SSRRRZ[ZZZRRZRZZRZRRZRZRSSRSRZZR', 8, GROUND_PALETTE);

engine.registerRoom(rm_mainMenu, 'mainMenu');
engine.registerRoom(rm_game, 'game');

// engine.registerRoom(rm_DEBUG_button, 'debug_button');
// engine.registerRoom(rm_DEBUG_mouse, 'debug_mouse');
// engine.registerRoom(rm_DEBUG_music, 'debug_music');
engine.registerRoom(rm_DEBUG_INCURSION, 'debug_incursion');
engine.registerRoom(rm_DEBUG_text, 'debug_text');
engine.registerRoom(rm_DEBUG_stars, 'debug_stars');
engine.registerRoom(rm_DEBUG_sprites, 'debug_sprites');

// Init stats.js
// const stats = new Stats();
// stats.showPanel(0);
// document.body.appendChild( stats.dom );

let physicsFrame=0;
window.physicsFrame = physicsFrame;

let readyTime = 0;

function main() {
    // Draw things. no user interaction or physics here.

    try {
        // stats.begin();
        engine.frames++;
        canvas.fill(engine.room.bgColor ?? 'black');

        engine.draw();
        engine.drawGui();

        // engine.drawCursor();

        // stats.end();

        if (debug) {
            canvas.drawText(`physics ticks: ${engine.physicsFrames} (~${(engine.physicsFrames/60).toFixed(1)}sec)`, 0, 0,{textBaseline:'top'})
            canvas.drawText(`camera pos: ${canvas.camera.x},${canvas.camera.y}`, 0, 8,{textBaseline:'top'})
            canvas.drawText(`run time: ${((performance.now()-readyTime)/1000).toFixed(1)}sec`, 0, 16, {textBaseline:'top'})
            canvas.drawText(`keys: ${JSON.stringify(keyboard.keys)}`, 0, 24, {textBaseline:'top'})
        }

        // Ask to run at the next frame
        requestAnimationFrame(main);
    } catch (e) {
        engine.running = false;

        canvas.setScale(1);
        canvas.fill('#a05555d0');

        const logo = assets.get`splash`
        canvas.drawImage(logo, 10, 10, logo.width, logo.height)

        canvas.setFillColor`black`;
        canvas.drawText(e, 5, canvas.height-5, {
            maxWidth: canvas.width-10,
            textBaseline: 'bottom'
        });

        throw e;
    }
}

function physicsTick() {
    // Runs 60 times a second regardless of frame rate.
    engine.physicsFrames++;
    engine.lastPhysicsFrame = performance.now();

    engine.room.step();

    keyboard.keysThisFrame = [];
    keyboard.keysUpThisFrame = [];
}

console.debug(engine.rooms);

let roomToLoad = (query.get`room` ? engine.getRoomIndex(query.get`room`) : engine.getRoomIndex`mainMenu`);
if (query.get`room`) {
    console.log('Requesting room', query.get`room`);
    engine.loadDelay = 0;
}

// Ensure assets are loaded.
function load() {
    if (engine.loading) {
        engine.loadLoop();
        setTimeout(load, 1000/60);
    } else {
        engine.initRooms();
        console.log("Initialised rooms");
        engine.room = roomToLoad;
        readyTime = performance.now();
        engine.lastPhysicsFrame = performance.now();
        main();
        setInterval(physicsTick, (query.get`slowdown` ? 500 : 1000/60)); // Update physics 60 times a second
    }
}

load();
