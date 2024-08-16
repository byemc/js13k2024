
import {Room} from "../../../hampsterengine/src/things";

export const rm_DEBUG_mouse = new Room();


rm_DEBUG_mouse.drawGui = _=> {
    // Draw the last click
    const lastClick = engine.lastClickPos;
    canvas.setFillColor('red');
    canvas.setStrokeColor('red');
    canvas.drawLine(lastClick.x, 0, lastClick.x, canvas.height);
    canvas.drawLine(0, lastClick.y, canvas.width, lastClick.y);
    canvas.drawText(`LAST(${Math.round(lastClick.x)},${Math.round(lastClick.y)})`, lastClick.x+2, lastClick.y-2, {})

    if (engine.mouseDown) {
        // Draw the mousedown position
        const moused = engine.mouseDownPos;
        canvas.setFillColor('green');
        canvas.setStrokeColor('green');
        canvas.drawLine(moused.x, 0, moused.x, canvas.height);
        canvas.drawLine(0, moused.y, canvas.width, moused.y);
        canvas.drawText(`DOW(${Math.round(moused.x)},${Math.round(moused.y)})`, moused.x+2, moused.y-2, {})

    }

    // Draw the current mouse position onto the screen.
    const cur = engine.mouse;
    canvas.setFillColor('black');
    canvas.setStrokeColor('black');
    canvas.drawLine(cur.x, 0, cur.x, canvas.height);
    canvas.drawLine(0, cur.y, canvas.width, cur.y);
    canvas.drawText(`CUR(${Math.round(cur.x)},${Math.round(cur.y)})`, cur.x+2, cur.y-2, {})
}

