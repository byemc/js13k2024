
import Canvas from "../../hampsterengine/src/canvas.js";
import Engine from "../../hampsterengine/src/engine.js";
import {Room} from "../../hampsterengine/src/things.js";

import {Logo, MainMenuButton} from "./objects.js";

const canvas = new Canvas('canvas');
const engine = new Engine(canvas);
const assets = engine.assetStore;

canvas.width = 640;
canvas.height = 480;
canvas.pixelRatio = 2;
canvas.ctx.setTransform(canvas.pixelRatio, 0, 0, canvas.pixelRatio, 0, 0);
canvas.ctx.imageSmoothingEnabled = false;

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
    canvas.drawText("(c) bye 2024", 30, canvas.height-45,{
        font: '8px serif'
    });
}

engine.registerRoom(rm_MainMenu, 'mainMenu');

function main() {
    requestAnimationFrame(main);
    canvas.fill(engine.room.bgColor ?? 'white');

    engine.step();
    engine.draw();
    engine.drawGui();

    engine.drawCursor();
}

engine.room = engine.getRoomIndex('mainMenu');
if (document.location.hash) engine.room = engine.getRoomIndex(document.location.hash);
main();
