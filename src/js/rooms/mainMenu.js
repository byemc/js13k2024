import {Room} from "../../../hampsterengine/src/things";
import {Logo, MainMenuButton} from "../objects";

export const rm_mainMenu = new Room();
rm_mainMenu.bgColor = '#f0f0f0';

const logo = new Logo();
logo.x = 30;
logo.y = 45;
logo.align = 2
rm_mainMenu.entities.push(logo);

const newGameButton = new MainMenuButton('New Game', _=>{
    engine.room = engine.getRoomIndex('game');
});
newGameButton.x = 30;
newGameButton.y = 70;
rm_mainMenu.entities.push(newGameButton);

rm_mainMenu.drawGui = _ => {
    canvas.setFillColor('#0f0f0f');
    canvas.drawText("(c) bye 2024", 30, canvas.height-25,{
        font: '8px serif'
    });
}