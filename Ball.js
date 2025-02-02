class Ball {
    constructor(x = 0, y = 0, dx = -2, dy = -2, radius = 10, color = 'red', ctx) {
        this.x = x;
        this.y = y;
        this.color = color;

        this.dx = dx;
        this.dy = dy;
        this.radius = radius;

        this.PI2 = Math.PI * 2;

        this.ctx = ctx;
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, this.PI2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    };
}