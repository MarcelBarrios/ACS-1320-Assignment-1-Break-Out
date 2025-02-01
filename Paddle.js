class Paddle {
    constructor(x, y, width, height, color = 'red', ctx) {
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

    makeBox(x, y, width, height, color) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    };

    render(ctx) {
        this.makeBox(this.x, this.y, this.width, this.height, this.color);
    }
}