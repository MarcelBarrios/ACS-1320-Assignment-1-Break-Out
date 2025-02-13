class Background {
    private ctx: CanvasRenderingContext2D;
    private backgroundColor: string;
    private canvas: HTMLCanvasElement;

    constructor(ctx: CanvasRenderingContext2D, backgroundColor: string, canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.backgroundColor = backgroundColor;
    }

    render(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default Background;
