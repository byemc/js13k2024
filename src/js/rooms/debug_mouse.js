
import {Room} from "../../../hampsterengine/src/things";

export const rm_DEBUG_mouse = new Room();


rm_DEBUG_mouse.drawGui = _=> {
    // Draw the last click
    canvas.setFillColor('red');
    canvas.setStrokeColor('red');
    canvas.drawLine(lastClickPos.x, 0, lastClickPos.x, canvas.height);
    canvas.drawLine(0, lastClickPos.y, canvas.width, lastClickPos.y);
    canvas.drawText(`LAST(${Math.round(lastClickPos.x)},${Math.round(lastClickPos.y)})`, lastClickPos.x+2, lastClickPos.y-2, {})


    // Draw the current mouse position onto the screen.
    canvas.setFillColor('black');
    canvas.setStrokeColor('black');
    canvas.drawLine(engine.mouse.x, 0, engine.mouse.x, canvas.height);
    canvas.drawLine(0, engine.mouse.y, canvas.width, engine.mouse.y);
    canvas.drawText(`CUR(${Math.round(engine.mouse.x)},${Math.round(engine.mouse.y)})`, engine.mouse.x+2, engine.mouse.y-2, {})
}

