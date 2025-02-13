import Brick from "./Brick";

class Bricks {
    cols: number;
    rows: number;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    padding: number;
    offsetLeft: number;
    offsetTop: number;
    color: string;
    colors: string[];
    bricks: Brick[][];

    constructor(
        cols: number,
        rows: number,
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        padding: number,
        offsetLeft: number,
        offsetTop: number,
        color: string
    ) {
        this.cols = cols;
        this.rows = rows;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.padding = padding;
        this.offsetLeft = offsetLeft;
        this.offsetTop = offsetTop;
        this.color = color;

        // Define color palette
        this.colors = ['#28B463', '#2874A6', '#AF7AC5', '#F1C40F', '#E74C3C'];

        this.bricks = [];
        this.init();
    }

    private init(): void {
        for (let c = 0; c < this.cols; c++) {
            this.bricks[c] = [];
            for (let r = 0; r < this.rows; r++) {
                const brickX = (r * (this.width + this.padding)) + this.offsetLeft;
                const brickY = (c * (this.height + this.padding)) + this.offsetTop;
                this.bricks[c][r] = new Brick(brickX, brickY, this.width, this.height, this.color, this.ctx);
            }
        }
    }

    render(): void {
        for (let c = 0; c < this.cols; c++) {
            for (let r = 0; r < this.rows; r++) {
                const brick = this.bricks[c][r];
                if (brick.status === 1) {
                    brick.render(this.ctx, this.colors[r % this.colors.length]);
                }
            }
        }
    }
}

export default Bricks;
