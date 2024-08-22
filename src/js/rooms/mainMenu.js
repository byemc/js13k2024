import {Room} from "../../../hampsterengine/src/things";
import {Logo, MainMenuButton} from "../objects";

export const rm_mainMenu = new Room();
rm_mainMenu.bgColor = '#050911';

// const logo = new Logo();
// logo.x = 30;
// logo.y = 45;
// logo.align = 2
// rm_mainMenu.entities.push(logo);

rm_mainMenu.flasher = !0;

rm_mainMenu.step = _=>{
    if (physicsFrame % 30) rm_mainMenu.flasher = !rm_mainMenu.flasher;
}

rm_mainMenu.drawGui = _ => {
    // canvas.setFillColor('#ffffff');

    fR.invert = 1;
    fR.draw("Thirteen minutes to space", 30, 8*4);

    if(rm_mainMenu.flasher) fR.draw("Press [ENTER] to start.", 30, canvas.height-(8*8));
    fR.draw("created by bye", 30, canvas.height-(8*4));
    fR.invert = 0;
}