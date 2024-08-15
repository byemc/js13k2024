
import Canvas from "../../hampsterengine/src/canvas.js";
import Engine from "../../hampsterengine/src/engine.js";
import {Room} from "../../hampsterengine/src/things.js";

import {Logo, MainMenuButton} from "./objects.js";

// Rooms
import {rm_DEBUG_button} from "./rooms/debug_button";
import {rm_DEBUG_mouse} from "./rooms/debug_mouse";

const canvas = new Canvas('canvas');
const engine = new Engine(canvas);
const assets = engine.assetStore;

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

// const rm_DEBUG_music = new Room();
// rm_DEBUG_music.audio = document.createElement("audio");
// rm_DEBUG_music.start = _=> {
//     canvas.pixelRatio =1;
//     canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
//
//     const player = new Soundbox();
//     const audio = rm_DEBUG_music.audio;
//     player.init(song);
//
//     let done = false;
//     setInterval(_=>{
//         if (done) return;
//
//         done = player.generate() >= 1;
//
//         if (done) {
//             const wave = player.createWave();
//             audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
//             audio.play();
//         }
//     })
// }
//
// rm_DEBUG_music.drawGui = _ => {
//     const audio = rm_DEBUG_music.audio;
//
//     // get the time in seconds
//     const date = new Date(0);
//     date.setSeconds(audio.currentTime);
//     const timeString = date.toISOString().substring(11, 19);
//
//     canvas.setFillColor('black');
//     canvas.drawText(audio.paused ? 'Paused' : 'Playing', 10, canvas.height - 10, {});
//     canvas.drawText(`${timeString}`, 10, canvas.height - 30, {});
// }
//
// engine.registerRoom(rm_DEBUG_music, 'debug_music');

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
main();
