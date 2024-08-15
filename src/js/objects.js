import {Thing} from "../../hampsterengine/src/things";

export class MainMenuButton extends Thing {
    constructor(label, action=function(){}) {
        super();

        this.label = label;
        this.action = action;

        this.fontSize = 10;
        this.font = 'serif';

        this.bgColor = '#5f5f5f';
        this.color = '#ffffff';
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
        canvas.fillRect(this.x, this.y, this.width, rectHeight);

        canvas.setFillColor(this.color);
        canvas.drawText(
            this.label, this.x + (text.width + padding)/2, this.y + rectHeight/2, {
                font: font, textBaseline: "middle", textAlign: "center"
            }
        );

        canvas.drawText("", 10, canvas.height-10, {
            textBaseline: "alphabetic"
        })
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
