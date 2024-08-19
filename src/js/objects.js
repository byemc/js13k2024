import {Thing} from "../../hampsterengine/src/things";
import ButtonBorder from "../img/button.webp";

// Private

function drawButton(x, y, width, height, sprite, clicked, depressedColour) {
    width = Math.ceil(width)
    height = Math.ceil(height)

    if (!clicked) {
        canvas.setFillColor(depressedColour);
        canvas.fillRect(x, y + height - 2, width, 2);
        canvas.fillRect(x + 1, y + height - 1, width - 2, 2);
    }

    canvas.setFillColor('white');
    canvas.fillRect(x + 1, y + 1, width - 2, height - 2);

    // Draw the border
    canvas.sliceImage(sprite, x, y, 3, height, 0, 0, 3, 14);
    canvas.sliceImage(sprite, x+3, y, width - 5, height, 3, 0, 11, 14);
    canvas.sliceImage(sprite, x+width-2, y, 3, height, 14, 0, 3, 14);
}

// Public

export class Button extends Thing {
    constructor(props) {
        super(props);
        this.sprite = ButtonBorder;

        this.clicked = false;
        this.icon = null; //Image data

        this.height = 14;
        this.width = 16;

        this.depressedColour = '#645372';
    }

    draw() {
        const basey = this.y + (this.clicked ? 2 : 0);
        drawButton(this.x, basey, this.width, this.height, this.sprite, this.clicked, this.depressedColour);
    }

    mousedown() {
        this.clicked = true;
    }

    mouseup() {
    }

    mouseupOffThing() {
        this.clicked = false;
    }
}

export class MainMenuButton extends Button {
    constructor(label, action=function(){}) {
        super();

        this.label = label;
        this.action = action;

        this.fontSize = 8;
        this.font = 'serif';

        this.color = '#000000';
    }

    draw() {
        const font = `${this.fontSize}px ${this.font}`;

        canvas.ctx.font = font;
        let text = canvas.ctx.measureText(this.label);

        const padding = this.fontSize/2;
        canvas.setFillColor(this.bgColor);

        this.width = text.width + padding;

        const basey = this.y + (this.clicked ? 2 : 0);
        drawButton(this.x, basey, this.width, this.height, this.sprite, this.clicked, this.depressedColour);

        canvas.setFillColor(this.color);
        canvas.drawText(
            this.label, this.x + this.width/2, basey + this.height/2, {
                font: font, textBaseline: "middle", textAlign: "center"
            }
        );

        // DO NOT REMOVE THIS. THE TEXT ON THE MAIN MENU BREAKS OTHERWISE.
        canvas.drawText("", 0, 0, {})
    }

    mouseup() {
        super.mouseup();
        this.action();
    }
}

export class Logo extends Thing {
    constructor(props) {
        super(props);
        this.spriteImage = null;
        this.align = 1; // 1=Center
                        // 2=Left
    }

    draw() {
        canvas.setFillColor('#0f0f0f');
        let font = 'Times New Roman';
        let align = (function () {
            switch (this.align) {
                default: return 'center';
                case 2: return 'left';
                case 3: return  'right';
            }
        })
        canvas.drawText('Committee of', this.x, this.y, {
            textAlign: align,
            textBaseline: 'bottom',
            font: `12px ${font}`
        })
        canvas.drawText('THIRTEEN', this.x, this.y, {
            textAlign: align,
            textBaseline: 'top',
            font: `24px ${font}`
        });
    }

}
