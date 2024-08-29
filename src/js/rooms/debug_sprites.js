
import {Room} from "../../../hampsterengine/src/things";

export const rm_DEBUG_sprites = new Room();
rm_DEBUG_sprites.start = _=> {
    canvas.setScale(3);
    canvas.ctx.imageSmoothingEnabled = false;
}

rm_DEBUG_sprites.draw = _=> {
    canvas.tileImage(engine.assetStore.get('grass').sprite, 0, 0, canvas.width, 8, 8, 8);
}
