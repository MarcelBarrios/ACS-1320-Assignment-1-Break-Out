class Sprite {
    constructor(x = 0, y = 0, width = 10, height = 10, color = 'red', ctx) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.ctx = ctx;
    }

    moveBy(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    render(ctx, color) {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}