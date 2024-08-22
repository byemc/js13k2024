
import {Entity, Room} from "../../../hampsterengine/src/things";
import Player from "../objects/player";
import {clone, clonePlayer} from "../extras";

export const rm_game = new Room();
const GRAVITY_X = 0; // I don't think we're going to use X gravity but i'm going to keep in the source in case i do
const GRAVITY_Y = 150; // Per second
const entities = rm_game.entities;


rm_game.start = _=>{
    engine.running = true;
}

rm_game.stop = _=>{
    engine.running = false;
}

rm_game.step = _=>{
    const elapsed = 1 / 60;

    // Clone the player so we can put them back after the first check
    const old_player = {...player};
    const entitiesWithoutThePlayer = [...entities].slice(entities.indexOf(player));

    // Accelerate the player towards GRAVITY_Y
    player.y += GRAVITY_Y * elapsed;

    if (player.checkCollision(floor)) {
        player.y = floor.top - player.height;
    }
}

rm_game.drawGui = _ => {
    // Draw the player's position
    canvas.setFillColor('black');
    canvas.drawText(`(${player.x},${player.y})`, 10, canvas.height-10, {
        maxWidth: canvas.width-20
    });
}

let player = new Player();
player.x = 40;
player.y = 40;
window.player = player;
entities.push(player);

let floor = new Entity();
floor.x = 0;
floor.y = 150;
floor.width = 256;
floor.height = 50;
floor.draw = _=> { canvas.setStrokeColor('black'); canvas.strokeRect(floor.x, floor.y, floor.width, floor.height) }
rm_game.entities.push(floor);
