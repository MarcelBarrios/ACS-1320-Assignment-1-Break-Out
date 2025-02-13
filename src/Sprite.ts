class Sprite {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    ctx: CanvasRenderingContext2D;

    constructor(
        x: number = 0,
        y: number = 0,
        width: number = 10,
        height: number = 10,
        color: string = 'red',
        ctx: CanvasRenderingContext2D
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.ctx = ctx;
    }

    moveBy(dx: number, dy: number): void {
        this.x += dx;
        this.y += dy;
    }

    moveTo(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    render(color: string = this.color): void {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export default Sprite;
