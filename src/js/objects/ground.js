import {Entity} from "../../../hampsterengine/src/things";
import {round, roundToRatio} from "../extras";

export default class Ground extends Entity {
    constructor(scale = 1) {
        super();

        this.width = canvas.width;
        this.height = 16 * scale;

        this.x = 0;
        this.y = canvas.height - this.height;

        this.scale = scale;

        this.surface = engine.assetStore.get`grass`.sprite;
        this.below = engine.assetStore.get`dirt`.sprite;
    }

    draw() {
        if (!(this.surface || this.below)) return;
        canvas.tileImage(this.surface, roundToRatio(this.x), roundToRatio(this.y), this.width, 8*this.scale, 8*this.scale, 8*this.scale);
        canvas.tileImage(this.below, roundToRatio(this.x), roundToRatio(this.y+8*this.scale), this.width, this.height-8*this.scale, 8*this.scale, 8*this.scale);
        canvas.fillRect(this.x, this.y, this.width, this.height);
    }
}

