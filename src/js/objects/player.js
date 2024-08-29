import {Entity} from "../../../hampsterengine/src/things";
import {round, roundToRatio} from "../extras";

export default class Player extends Entity {
    constructor(props) {
        super(props);

        this.jumping = false;
    }

    draw() {
        canvas.setFillColor('red');
        const timeSinceLastFrame = (performance.now() - engine.lastPhysicsFrame) / 1000 / (query.get('slowdown') ? 60 : 1);
        const interpolationX = this.vx * timeSinceLastFrame;
        const interpolationY = this.vy * timeSinceLastFrame;
        // const interpolationX = 0;
        // const interpolationY = 0;
        canvas.fillRect(roundToRatio(this.x+interpolationX),roundToRatio(this.y+interpolationY),this.width,this.height);
    }
}
