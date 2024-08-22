import {Entity, PhysicsEntity} from "../../../hampsterengine/src/things";

export default class Player extends PhysicsEntity {
    draw() {
        canvas.setFillColor('red');
        canvas.fillRect(this.x,this.y,10,16);
    }
}
