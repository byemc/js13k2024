
import {Room, Thing} from "../../../hampsterengine/src/things";
import {Button} from "../objects";

export const rm_DEBUG_button = new Room();
rm_DEBUG_button.bgColor = 'gray';

const demoButton = new Button();
rm_DEBUG_button.things.push(demoButton);
