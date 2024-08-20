
import {Room} from "../../../hampsterengine/src/things";

export const rm_DEBUG_text = new Room();

const sample_text = `haiiiiiii this is the text test room
if you're here, welcome!
why are you looking at the debug rooms??? they're boring!!
im not hiding any cut content here. i dont have time for that

here is the same message with a pixel art font:`

rm_DEBUG_text.drawGui = _=>{
    canvas.setFillColor('black');

    canvas.drawText(sample_text, canvas.center.x, 10, {
        textBaseline: 'top', textAlign: 'center', maxWidth: canvas.width-20, size: 16
    })

    fR.drawLines(sample_text, 10, canvas.center.y);
}
