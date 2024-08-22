
import {Entity, Room} from "../../../hampsterengine/src/things";
import Player from "../objects/player";
import {GRAVITY} from "../extras";

export const rm_game = new Room();
const GRAVITY_X = 0;
const GRAVITY_Y = 0.0003;

rm_game.start = _=>{
    engine.running = true;
}

rm_game.stop = _=>{
    engine.running = false;
}

rm_game.step = _=>{

}

rm_game.drawGui = _ => {
    // Draw the player's position
    canvas.setFillColor('black');
    canvas.drawText(`(${player.x},${player.y})`, 10, canvas.height-10, {
        maxWidth: canvas.width-20
    });
}

const player = new Player();
// player.ay = 0.1;
player.x = 40;
rm_game.entities.push(player);
