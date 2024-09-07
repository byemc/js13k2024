
import {Entity, Room} from "../../../hampsterengine/src/things";
import Player from "../objects/player";
import {clone, clonePlayer, abs, roundToRatio} from "../extras";
import Ground from "../objects/ground";

export const rm_game = new Room();

const entities = rm_game.entities;

rm_game.width = 2560;
rm_game.height = 500;

rm_game.start = _=>{
    canvas.setScale(2);
    engine.running = true;
}

rm_game.stop = _=>{
    engine.running = false;
}

rm_game.step = _=>{
    canvas.camera.step();
    const player = rm_game.get('plr');
    player.step();

    if (player.x !== player.lastFramePos.x || player.y !== player.lastFramePos.y) {
        player.lastFramePos = {x: player.x, y: player.y};
        // Update the camera
        canvas.camera.goTo(
            Math.min(Math.max(player.x+(player.width/2)-canvas.width/2, canvas.width/8), rm_game.width-canvas.width),
            Math.min(Math.max(player.y-canvas.height/8, canvas.height/8), rm_game.height-canvas.height),
            150
        );
    }

}

rm_game.draw = _ => {
    canvas.ctx.save();
    canvas.ctx.translate(roundToRatio(-canvas.camera.x,), roundToRatio(-canvas.camera.y));
    for (let thing of rm_game.entities) {
        thing.draw();
    }
    // canvas.strokeRect(rm_game.x, rm_game.y, player.width, player.height);
    canvas.ctx.restore();
}

rm_game.drawGui = _ => {
    // Draw the player's position
    canvas.setFillColor('black');
    canvas.drawText(`Position: (${player.x},${player.y})`, 5, canvas.height-5, {
        maxWidth: canvas.width-10,
        size: 4
    });
    canvas.drawText(`Velocity: (${player.vx},${player.vy})`, 5, canvas.height-9, {
        maxWidth: canvas.width-10,
        size: 4
    });
    canvas.drawText(`Acceleration: (${player.ax},${player.ay})`, 5, canvas.height-13, {
        maxWidth: canvas.width-10,
        size: 4
    });
    canvas.drawText(`Head: x:${player.headPosStart.x} y:${player.headPosStart.y}`, 5, canvas.height-17, {
        maxWidth: canvas.width-10,
        size: 4
    });
    canvas.drawText(`Head Target: x:${player.headTarget.x} y:${player.headTarget.y}`, 5, canvas.height-21, {
        maxWidth: canvas.width-10,
        size: 4
    });
}

rm_game.init = _=>{
    let player = new Player();

    player.x = 40;
    player.y = 40;
    window.player = player;
    rm_game.push(player, 'plr');

    let ground = new Ground(1);
    ground.width = rm_game.width;
    ground.y = rm_game.height - ground.height;

    rm_game.push(ground);
}

