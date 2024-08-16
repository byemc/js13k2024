
import {Room} from "../../../hampsterengine/src/things";

export const rm_DEBUG_music = new Room();

rm_DEBUG_music.start = _ => {
    engine.assetStore.get('mus_DEMO').play();
}

rm_DEBUG_music.stop = _ => {
    engine.assetStore.get('mus_DEMO').pause();
}

rm_DEBUG_music.drawGui = _=> {
    canvas.setFillColor('black');
    canvas.drawText((engine.assetStore.get('mus_DEMO').paused ? 'paused' : 'playing'), canvas.center.x, canvas.center.y, {});
}
