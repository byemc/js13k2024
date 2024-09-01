
import {Entity, Room} from "../../../hampsterengine/src/things";
import Player from "../objects/player";
import {clone, clonePlayer, abs} from "../extras";
import Ground from "../objects/ground";

export const rm_game = new Room();
const GRAVITY_X = 0; // I don't think we're going to use X gravity but i'm going to keep in the source in case i do
const GRAVITY_Y = 600; // Per second
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

    const elapsed = 1 / 60;
    const player = rm_game.get('plr');

    let friction = 0.95;
    const boost = keyboard.keys.includes("Shift") ? 40 : 0;

    for (const key of keyboard.keys) {
        switch (key) {
            case "ArrowLeft":
                player.vx = -50-boost;
                break;
            case "ArrowRight":
                player.vx = 50+boost;
                break;
            case " ":
                if (!player.jumping) {
                    player.jumping = true;
                    player.vy -= 150;
                }
        }
    }

    const entitiesWithoutThePlayer = [...entities].toSpliced(entities.indexOf(player), 1);
    // console.debug(entitiesWithoutThePlayer);

    player.vx = Math.min(400, player.vx + (player.ax * elapsed + GRAVITY_X*elapsed));
    player.vy = Math.min(400, player.vy + (player.ay * elapsed + GRAVITY_Y*elapsed));
    player.x += player.vx * elapsed;
    player.y += player.vy * elapsed;

    // Make acceleration decay
    player.ax *= 0.1;
    player.ay *= 0.1;

    if (abs(player.ax) < 0.01) player.ax = 0;
    if (abs(player.ay) < 0.01) player.ay = 0;

    rm_game.x = player.x;
    rm_game.y = player.y;

    for (const entity of entitiesWithoutThePlayer) {
        if (player.checkCollision(entity)) {
            friction = 0.8;
            let side = player.resolveCollision(entity);
            if (side === 2) player.jumping = 0;
            if (side === 1 || side === 3) friction = 0.5;
        }
    }

    // player.vy *= friction;
    player.vx *= friction;

    if (abs(player.vy) < 1) player.vy = 0;
    if (abs(player.vx) < 1) player.vx = 0;

    if ({x: player.x, y: player.y} !== player.lastFramePos) {
        player.lastFramePos = {x: player.x, y: player.y};
        // Update the camera
        canvas.camera.goTo(
            Math.min(Math.max(player.x+(player.width/2)-canvas.width/2, canvas.width/8), rm_game.width-canvas.width),
            Math.min(Math.max(player.y-canvas.height/8, canvas.height/8), rm_game.height-canvas.height),
            100
        );
    }
}

rm_game.draw = _ => {
    canvas.ctx.save();
    canvas.ctx.translate(-canvas.camera.x, -canvas.camera.y);
    for (let thing of rm_game.entities) {
        thing.draw();
    }
    canvas.strokeRect(rm_game.x, rm_game.y, player.width, player.height);
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
}

rm_game.init = _=>{
    let player = new Player();

    player.x = 40;
    player.y = 40;
    player.width = 8;
    player.height = 8*(8/5);
    window.player = player;
    rm_game.push(player, 'plr');

    let ground = new Ground(1);
    ground.width = rm_game.width;
    ground.y = rm_game.height - ground.height;

    rm_game.push(ground);

}

