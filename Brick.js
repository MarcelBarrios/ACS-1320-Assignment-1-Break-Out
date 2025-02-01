class Brick {
    constructor(x, y, width, height, color, ctx) {
        this.x = x;
        this.y = y;
        this.status = 1;
        this.width = width;
        this.height = height;
        this.color = color;
        this.ctx = ctx;
    }

    makeBox(x, y, width, height, color) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    };

    render(brick, color) {
        this.makeBox(brick.x, brick.y, this.width, this.height, color);
    }
}