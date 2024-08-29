
import {Room} from "../../../hampsterengine/src/things";
import Ground from "../objects/ground";

export const rm_DEBUG_sprites = new Room();
rm_DEBUG_sprites.init = function () {
    const ground = new Ground();
    rm_DEBUG_sprites.push(ground, 'ground');
}

rm_DEBUG_sprites.start = _=> {
    canvas.setScale(3);
    rm_DEBUG_sprites.init();
    canvas.ctx.imageSmoothingEnabled = false;
}

