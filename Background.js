class Background {
    constructor(ctx, backgroundColor) {
        this.ctx = ctx;
        this.backgroundColor = backgroundColor;
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}