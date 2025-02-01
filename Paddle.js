class Paddle {
    constructor(x, y, width, height, color = 'red') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    moveBy(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    render(ctx) {
        makeBox(this.x, this.y, this.width, this.height, this.color);
    }
}