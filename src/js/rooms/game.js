
import {Room} from "../../../hampsterengine/src/things";
import {Player} from "../objects";
import {GRAVITY} from "../extras";

export const rm_game = new Room();
rm_game.start = _=>{
    canvas.pixelRatio = 3;
    canvas.ctx.setTransform(canvas.pixelRatio, 0, 0, canvas.pixelRatio, 0, 0);
    canvas.canvas.style.cursor = 'none';
    engine.running = true;
}
rm_game.stop = _=>{
    canvas.canvas.style.cursor = 'auto';
    engine.running = false;

}
rm_game.step = _=>{

}

const player = new Player();
player.velocity.x = 0;
player.velocity.y = 0;
player.direction = 0;// Radians
rm_game.entities.push(player);
