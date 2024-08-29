import {Room} from "../../../hampsterengine/src/things";
import {Logo, MainMenuButton, Stars} from "../objects";

export const rm_mainMenu = new Room();
rm_mainMenu.bgColor = '#050911';

// const logo = new Logo();
// logo.x = 30;
// logo.y = 45;
// logo.align = 2
// rm_mainMenu.entities.push(logo);

const stars = new Stars();

rm_mainMenu.step = _=>{
    for (const key of keyboard.keysThisFrame) {
        switch (key.toLowerCase()) {
            case "enter":
                engine.room = engine.getRoomIndex("game");
                break;
            case "o":
                alert("there are none!");
                break;
        }
    }
}

rm_mainMenu.draw = _=> {
    // canvas.tempFilter(function () {
    //     canvas.drawImage(engine.assetStore.get('stars'), 0, 0, 2560, 2400);
    // }, "invert(1) opacity(0.3)");
    stars.draw(-(engine.frames/500), 0, 2560, 240)
}

rm_mainMenu.drawGui = _ => {
    // canvas.setFillColor('#ffffff');

    fR.invert = 1;
    fR.draw("Thirteen minutes to space", 30, 8*4);

    fR.draw("Press [ENTER] to start.", 30, canvas.height-(8*8));
    fR.draw("Press [O] for options.", 30, canvas.height-(8*6));
    fR.draw("created by bye", 30, canvas.height-(8*4));
    fR.invert = 0;
}

