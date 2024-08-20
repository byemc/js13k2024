import {Entity} from "../../hampsterengine/src/things";
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

export class Button extends Entity {
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

export class Logo extends Entity {
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
        canvas.drawText('Untitled', this.x, this.y, {
            textAlign: align,
            textBaseline: 'bottom',
            font: `12px ${font}`
        })
    }

}

export class FontRenderer {
    constructor(font) {
        this.font = font;
        this.h = 8;
        this.w = 6;
    }

    draw(text, x, y) {
        text = text.toUpperCase();
        let split
        try{
            split = text.split("");
        } catch (TypeError) {
            return;
        }
        for (let i = 0; i < split.length; i++) {
            const char = split[i];
            const code = char.charCodeAt();
            let slice;
            if (code < 90 && code > 64) slice = code - 65; // Starts at 0 (LETTER)
            else if (code < 58 && code > 48) slice = 25 + (code - 59) // Starts at 25
            else if (code === 91) slice = 35;
            else if (code === 93) slice = 36;
            else slice = 37;

            if (slice < 0) {
                canvas.setFillColor('red');
                // debugger
            }
            else canvas.setFillColor('black');
            // canvas.drawText(`${Math.round(slice)}`, x+(i*(this.w+1)), y, {})
            canvas.sliceImage(
                this.font,
                x+(i*(this.w+1)), y,
                this.w, this.h,
                this.w * (slice % 7), this.h * Math.round(slice / 7), this.w, this.h);
        }
    }

    drawLines(text, x, y) {
        const lines = text.split(/\n/);
        for (let i = 0; i < lines.length; i++) {
            this.draw(lines[i], x, y+(i*(this.h+1)));
        }
    }
}

// ENTITIES

export class Player extends Entity {
    constructor() {
        super();
        this.height=16;
        this.width=10;
        this.velocity = {
            x:0, y:0
        };
    }

    draw() {
        canvas.setFillColor('red');
        canvas.fillRect(this.x,this.y,this.width,this.height);
    }

    physicsTick() {
        // Physics update 60 times a second
        this.y += this.velocity.y/60;
        this.x += this.velocity.x/60;
    }
}
