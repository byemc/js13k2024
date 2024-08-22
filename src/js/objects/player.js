import {Entity} from "../../../hampsterengine/src/things";

export default class Player extends Entity {
    draw() {
        canvas.setFillColor('red');
        canvas.fillRect(this.x,this.y,10,16);
    }
}
