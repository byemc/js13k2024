
import {collideRect, Entity, PhysicsEntity, resolveElastic, Room} from "../../../hampsterengine/src/things";
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
    const elapsed = (1000/60); // runs 60 times a second
    const gx = GRAVITY_X*elapsed;
    const gy = GRAVITY_Y*elapsed;
    const entities = rm_game.entities;

    for (let i = 0; i < entities.length; i++) {
        let entity = entities[i];

        entity.updateBounds();

        switch (entity.type) {
            case PhysicsEntity.DYNAMIC:
                entity.vx += entity.ax * elapsed + gx;
                entity.vy += entity.ay * elapsed + gy;
                entity.x += entity.vx * elapsed;
                entity.y += entity.vy * elapsed;
                break;
            case PhysicsEntity.KINEMATIC:
                entity.vx += entity.ax * elapsed;
                entity.vy += entity.ay * elapsed;
                entity.x += entity.vx * elapsed;
                entity.y += entity.vy * elapsed;
                break;
        }

        // Check if the entity is colliding with another entity
        for (let k = 0; k < entities.length; k++) {
            if (k === i) {
                // console.debug('SAME')
                continue;
            }
            if (collideRect(entities[i], entities[k])) {
                console.debug('COLLIDE');
                resolveElastic(entities[i], entities[k]);
            }
        }
    }
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

const floor = new PhysicsEntity();
floor.type = PhysicsEntity.KINEMATIC;
// floor.resitution = 0;
floor.ay = 0.00000001;
floor.height = 10;
floor.width = 240*2;
floor.x = -(240/2);
floor.y = 160;
rm_game.entities.push(floor);
