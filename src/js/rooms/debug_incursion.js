
import {Room} from "../../../hampsterengine/src/things";

export const rm_DEBUG_INCURSION = new Room();

rm_DEBUG_INCURSION.frames = [];

rm_DEBUG_INCURSION.draw = _ => {
    // Convert the current frame number to HEX and set it as the background colour
    canvas.fill(`#${engine.frames.toString(16)}`);
    canvas.setFillColor('black')
    canvas.drawText(engine.frames.toString(16), 2, canvas.height, {});

    // Draw 60 frames ago
    if (rm_DEBUG_INCURSION.frames.at(-165)) canvas.drawImageFromCenter(rm_DEBUG_INCURSION.frames.at(-120), canvas.center.x, canvas.center.y, 160, 160);

    canvas.setFillColor('white')
    canvas.drawText('THIS ROOM MAY CAUSE SEIZURES', canvas.center.x, 50, {
        textAlign: 'center', textBaseline: 'middle'
    })

    // Get the current state of the canvas
    canvas.canvas.toBlob((blob) => {
        const image = new Image();
        const url = URL.createObjectURL(blob);

        image.onload = _=> {
            rm_DEBUG_INCURSION.frames.push(image);
        }

        image.src = url;
    });

    canvas.setFillColor('black')

}
