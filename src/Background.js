class Background {
    constructor(ctx, backgroundColor, canvas) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.backgroundColor = backgroundColor;
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default Background;