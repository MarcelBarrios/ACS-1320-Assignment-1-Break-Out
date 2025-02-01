class Bricks {
    constructor(cols, rows, ctx) {
        this.cols = cols;
        this.rows = rows;
        this.ctx = ctx;
        this.bricks = [];
        this.init();
    }

    init() {
        for (let c = 0; c < this.cols; c += 1) {
            this.bricks[c] = [];
            for (let r = 0; r < this.rows; r += 1) {
                const brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                const brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                this.bricks[c][r] = new Brick(brickX, brickY, brickWidth, brickHeight, column1Color, this.ctx);
            }
        }
    }

    render(ctx) {
        for (let c = 0; c < this.cols; c += 1) {
            for (let r = 0; r < this.rows; r += 1) {
                const brick = this.bricks[c][r];
                if (brick.status === 1) {
                    const colors = [column1Color, column2Color, column3Color, column4Color, column5Color];
                    brick.render(brick, colors[r % colors.length]);
                }
            }
        }
    };
}