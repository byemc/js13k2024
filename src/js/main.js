
import Canvas from "../../hampsterengine/src/canvas.js";
import Engine from "../../hampsterengine/src/engine.js";
import {Room} from "../../hampsterengine/src/things.js";

import {Logo, MainMenuButton} from "./objects.js";
import SoundBox from "./sb-player-small";
import {mus_DEMOSONG} from "../music/DEMOSONGDONOTCOMMIT";

// Rooms
import {rm_DEBUG_button} from "./rooms/debug_button";
import {rm_DEBUG_mouse} from "./rooms/debug_mouse";
import assetStore from "../../hampsterengine/src/assetStore";

// Music

const canvas = new Canvas('canvas');
const engine = new Engine(canvas);
const assets = engine.assetStore;

assets.addSoundBoxAudio('mus_DEMO', mus_DEMOSONG, new SoundBox());

canvas.width = 640;
canvas.height = 480;
canvas.pixelRatio = 2;
canvas.ctx.setTransform(canvas.pixelRatio, 0, 0, canvas.pixelRatio, 0, 0);
canvas.ctx.imageSmoothingEnabled = false;

let lastClickPos = {
    x: 0, y: 0
}

window.lastClickPos = lastClickPos;

const rm_MainMenu = new Room();
rm_MainMenu.bgColor = 'black';

const logo = new Logo();
logo.x = 30;
logo.y = 45;
logo.align = 2
rm_MainMenu.things.push(logo);

const newGameButton = new MainMenuButton('New Game');
newGameButton.x = 30;
newGameButton.y = 70;
rm_MainMenu.things.push(newGameButton);

rm_MainMenu.drawGui = _ => {
    canvas.setFillColor('white');
    canvas.drawText("(c) bye 2024", 30, canvas.height-45,{
        font: '8px serif'
    });
}

engine.registerRoom(rm_MainMenu, 'mainMenu');

engine.registerRoom(rm_DEBUG_button, 'debug_button');
engine.registerRoom(rm_DEBUG_mouse, 'debug_mouse');

function main() {
    requestAnimationFrame(main);
    canvas.fill(engine.room.bgColor ?? 'white');

    engine.step();
    engine.draw();
    engine.drawGui();

    engine.drawCursor();
}

console.debug(engine.rooms);

canvas.canvas.addEventListener('click', ev => {
    lastClickPos.x = engine.mouse.x;
    lastClickPos.y = engine.mouse.y;
    console.log(lastClickPos);
})

if (document.location.hash) {
    console.log('Requesting room', document.location.hash.substring(1));
    engine.room = engine.getRoomIndex(document.location.hash.substring(1));
} else {
    engine.room = engine.getRoomIndex('mainMenu');
}

// Ensure assets are loaded.

function load() {
    if (engine.loading) {
        engine.loadLoop();
        setTimeout(main, 1000/60);
    } else {
        engine.room = engine.getRoomIndex('mainMenu');
        main();
    }
}

load();
