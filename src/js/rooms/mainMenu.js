import {Room} from "../../../hampsterengine/src/things";
import {Logo, MainMenuButton} from "../objects";

export const rm_mainMenu = new Room();
rm_mainMenu.bgColor = '#f0f0f0';

const logo = new Logo();
logo.x = 30;
logo.y = 45;
logo.align = 2
rm_mainMenu.entities.push(logo);

rm_mainMenu.drawGui = _ => {
    canvas.setFillColor('#0f0f0f');

    canvas.drawText("Press [ENTER] to start.", 30, canvas.height-55, {});
    canvas.drawText("(c) bye 2024", 30, canvas.height-35, {});
    canvas.drawText("Uses 3rd-party licenses. Press [L] to read.", 30, canvas.height-25, {});
}