import Brick from "./Brick";

class Bricks {
    constructor({ cols, rows, ctx, width, height, padding, offsetLeft, offsetTop, color }) {
        this.cols = cols;
        this.rows = rows;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.padding = padding;
        this.offsetLeft = offsetLeft;
        this.offsetTop = offsetTop;
        this.color = color;
        const column1Color = '#28B463';
        const column2Color = '#2874A6';
        const column3Color = '#AF7AC5';
        const column4Color = '#F1C40F';
        const column5Color = '#E74C3C';
        this.colors = [column1Color, column2Color, column3Color, column4Color, column5Color];
        this.bricks = [];
        this.init();
    }

    init() {
        for (let c = 0; c < this.cols; c += 1) {
            this.bricks[c] = [];
            for (let r = 0; r < this.rows; r += 1) {
                const brickX = (r * (this.width + this.padding)) + this.offsetLeft;
                const brickY = (c * (this.height + this.padding)) + this.offsetTop;
                this.bricks[c][r] = new Brick(brickX, brickY, this.width, this.height, this.color, this.ctx);
            }
        }
    }

    render(ctx) {
        for (let c = 0; c < this.cols; c += 1) {
            for (let r = 0; r < this.rows; r += 1) {
                const brick = this.bricks[c][r];
                if (brick.status === 1) {
                    brick.render(brick, this.colors[r % this.colors.length]);
                }
            }
        }
    };
}

export default Bricks;