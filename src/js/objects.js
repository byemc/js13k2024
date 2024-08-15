import {Thing} from "../../hampsterengine/src/things";
import ButtonBorder from "../img/button.webp";

// Private

function drawButton(x, y, width, height, sprite, clicked, depressedColour) {
    width = Math.ceil(width)
    height = Math.ceil(height)
    // base co-ords
    const basey = y + (clicked ? 2 : 0);

    if (!clicked) {
        canvas.setFillColor(depressedColour);
        canvas.fillRect(x, y + height - 2, width, 2);
        canvas.fillRect(x + 1, y + height - 1, width - 2, 2);
    }

    canvas.setFillColor('white');
    canvas.fillRect(x + 1, basey + 1, width - 2, height - 2);

    // Draw the border
    canvas.sliceImage(sprite, x, basey, 3, height, 0, 0, 3, 14);
    canvas.sliceImage(sprite, x+3, basey, width - 5, height, 3, 0, 11, 14);
    canvas.sliceImage(sprite, x+width-2, basey, 3, height, 14, 0, 3, 14);
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

        this.depressedColour = '#3e3546';
    }

    draw() {
        drawButton(this.x, this.y, this.width, this.height, this.sprite, this.clicked, this.depressedColour);
    }

    mousedown() {
        super.mousedown();
        this.clicked = true;
    }

    mouseupOffThing() {
        super.mouseupOffThing();
    }
}

export class MainMenuButton extends Button {
    constructor(label, action=function(){}) {
        super();

        this.label = label;
        this.action = action;

        this.fontSize = 10;
        this.font = 'serif';

        this.color = '#000000';
    }

    draw() {
        const font = `${this.fontSize}px ${this.font}`;

        canvas.ctx.font = font;
        let text = canvas.ctx.measureText(this.label);

        const padding = this.fontSize/2;
        canvas.setFillColor(this.bgColor);

        const rectHeight = this.fontSize + padding;
        this.height = rectHeight;
        this.width = text.width + padding;

        drawButton(this.x, this.y, this.width, this.height, this.sprite, this.clicked, this.depressedColour);

        canvas.setFillColor(this.color);
        canvas.drawText(
            this.label, this.x + (text.width + padding)/2, this.y + rectHeight/2, {
                font: font, textBaseline: "middle", textAlign: "center"
            }
        );

        // DO NOT REMOVE THIS. THE TEXT ON THE MAIN MENU BREAKS OTHERWISE.
        canvas.drawText("", 0, 0, {})
    }

    click() {
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
        canvas.setFillColor('#efefef');
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
