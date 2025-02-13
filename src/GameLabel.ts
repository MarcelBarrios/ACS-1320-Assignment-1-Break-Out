import Sprite from './Sprite';

class GameLabel extends Sprite {
    private text: string;
    public value: number;
    private font: string;

    constructor(text: string, x: number, y: number, color: string, font: string = '16px Arial') {
        super(x, y, 0, 0, color);
        this.text = text;
        this.value = 0;
        this.font = font;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(`${this.text} ${this.value}`, this.x, this.y);
    }
}

export default GameLabel;
