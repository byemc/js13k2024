import {Entity} from "../../../hampsterengine/src/things";

export default class Player extends Entity {
    constructor(props) {
        super(props);
    }

    draw() {
        canvas.setFillColor('red');
        canvas.fillRect(this.x,this.y,10,16);
    }

    checkCollision(other) {
        // Checks if colliding with another entity. Returns true if colliding.

        return (
            this.left < other.right &&
            this.right > other.left &&
            this.top < other.bottom &&
            this.bottom > other.top
        );
    }
}
