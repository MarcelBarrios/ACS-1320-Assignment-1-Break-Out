import Sprite from "./Sprite";

class Ball extends Sprite {
    private dx: number;
    private dy: number;
    private radius: number;
    private readonly PI2: number;
    private ctx: CanvasRenderingContext2D;

    constructor(
        x: number = 0,
        y: number = 0,
        dx: number = -2,
        dy: number = -2,
        radius: number = 10,
        color: string = "red",
        ctx: CanvasRenderingContext2D
    ) {
        super(x, y, radius * 2, radius * 2, color);

        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.PI2 = Math.PI * 2;
        this.ctx = ctx;
    }

    move(): void {
        this.moveBy(this.dx, this.dy);
    }

    render(): void {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, this.PI2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export default Ball;
