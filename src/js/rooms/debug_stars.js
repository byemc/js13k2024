import {Room} from "../../../hampsterengine/src/things";
import {Stars} from "../objects";

export const rm_DEBUG_stars = new Room();
rm_DEBUG_stars.bgColor = 'black';

rm_DEBUG_stars.draw = _ => {
    stars.draw(0, 0, canvas.width, canvas.height);
}

const stars = new Stars();
