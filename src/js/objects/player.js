import {Entity} from "../../../hampsterengine/src/things";
import {abs, easeOutSine, GRAVITY_X, GRAVITY_Y, round, roundToRatio} from "../extras";
import {rm_game} from "../rooms/game";

export default class Player extends Entity {
    constructor(props) {
        super(props);

        this.jumping = false;

        this.width = 4;
        this.height = 8;

        this.flipped = 0;

        this.stepUp = 0;

        this.lastFramePos = {x: this.x, y: this.y};

        this.headTarget = {x:this.x, y:this.y};
        this.headPos = {x:this.x, y: this.y};
        this.headPosStart = {x:this.x, y: this.y};
        this.headTrans = 25;
        this.headStartTime = performance.now();

        this.collideRects = [
            {x:0, y:0, w: this.width, h: this.height}
        ];
    }

    step() {
        const elapsed = 1 / 60;

        const keys = keyboard.keys;
        const keysUp = keyboard.keysUpThisFrame;

        let friction = 0.95;
        const boost = keys.includes("Shift") ? 40 : 0;

        for (let key of keys) {
            switch (key) {
                case "ArrowLeft":
                    this.flipped = !0;
                    if (!(engine.physicsFrames % 15)) this.stepUp ^= true;
                    this.vx = -50-boost;
                    break;
                case "ArrowRight":
                    this.flipped = 0;
                    if (!(engine.physicsFrames % 15)) this.stepUp ^= true;
                    this.vx = 50+boost;
                    break;
                case " ":
                    if (!this.jumping) {
                        this.jumping = true;
                        this.vy -= 150;
                    }
                    break;
            }
        }

        if ((!(engine.physicsFrames % 15) && this.vx == 0) || this.vy) this.stepUp = 0;


        const entities = engine.room.entities;
        const entitiesWithoutThePlayer = [...entities].toSpliced(entities.indexOf(this), 1);
        // console.debug(entitiesWithoutThePlayer);

        this.vx = Math.min(400, this.vx + (this.ax * elapsed + GRAVITY_X*elapsed));
        this.vy = Math.min(400, this.vy + (this.ay * elapsed + GRAVITY_Y*elapsed));
        this.x += this.vx * elapsed;
        this.y += this.vy * elapsed;

        // Make acceleration decay
        this.ax *= 0.1;
        this.ay *= 0.1;

        if (abs(this.ax) < 0.01) this.ax = 0;
        if (abs(this.ay) < 0.01) this.ay = 0;

        engine.room.x = this.x;
        engine.room.y = this.y;

        for (const entity of entitiesWithoutThePlayer) {
            if (this.checkCollision(entity)) {
                friction = 0.8;
                let side = this.resolveCollision(entity);
                if (side === 2) this.jumping = 0;
                if (side === 1 || side === 3) friction = 0.5;
            }
        }

        // player.vy *= friction;
        this.vx *= friction;

        if (abs(this.vy) < 1) this.vy = 0;
        if (abs(this.vx) < 1) this.vx = 0;

        if (player.x !== player.lastFramePos.x || player.y !== player.lastFramePos.y || !this.stepUp    ) {
            this.headTarget = {x: this.x, y: this.y - (this.stepUp ? 1 : 0)}
            this.headPosStart = structuredClone(this.headPos);
            this.headStartTime = performance.now();
        }
    }

    draw() {
        canvas.setFillColor('red');
        // const timeSinceLastFrame = (performance.now() - engine.lastPhysicsFrame) / 1000 / (query.get('slowdown') ? 60 : 1);
        // const interpolationX = this.vx * timeSinceLastFrame;
        // const interpolationY = this.vy * timeSinceLastFrame;
        // const interpolationX = 0;
        // const interpolationY = 0;
        for (let rect of this.collideRects) {
            console.debug(rect);
            canvas.fillRect(roundToRatio(this.x + rect.x),roundToRatio(this.y + rect.y),rect.w,rect.h);
        }

        canvas.tempFilter(_=>{
            const img = this.flipped ? engine.assetStore.get`body`.flipped : engine.assetStore.get`body`.sprite
            canvas.drawImage(
                img,
                this.x - 2,
                this.y - (this.stepUp ? 1 : 0),
                8, (this.stepUp ? 9 : 8)
            )
        }, 'opacity(0.7)');

        // calculate the position of the head
        let distX = this.headTarget.x - this.headPosStart.x;
        let distY = this.headTarget.y - this.headPosStart.y;

        const elapsed = Math.min(performance.now() - this.headStartTime, this.headTrans);
        const end = this.headTrans;
        const pos = easeOutSine(elapsed / end || 1);

        this.headPos.x = Math.min(
            this.headTarget.x,
            this.headPosStart.x + (distX * pos)
        );
        this.headPos.y = Math.min(
            this.headTarget.y,
            this.headPosStart.y + (distY * pos)
        );

        // Draw the head
        canvas.drawImage(
            engine.assetStore.get`player_head`.sprite,
            roundToRatio(this.headPos.x - 1),
            roundToRatio(this.headPos.y - 7),
            engine.assetStore.get`player_head`.size,
            engine.assetStore.get`player_head`.size
        )
    }
}
