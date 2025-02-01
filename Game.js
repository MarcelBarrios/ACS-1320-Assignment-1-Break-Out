class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.ballRadius = 10;
        this.paddleHeight = 10;
        this.paddleWidth = 75;
        this.brickRowCount = 5;
        this.brickColumnCount = 3;
        this.brickWidth = 75;
        this.brickHeight = 20;
        this.brickPadding = 10;
        this.brickOffsetTop = 30;
        this.brickOffsetLeft = 30;
        this.paddleXStart = (this.canvas.width - this.paddleWidth) / 2;
        this.paddleYStart = this.canvas.height - this.paddleHeight;
        this.ballColor = '#FF5733';
        this.paddleColor = '#C70039';
        this.colorWhiteText = '#FFFFFF';
        this.backgroundColor = '#1C2833';
        this.gameOverMessage = 'GAME OVER';

        this.background = new Background(this.ctx, this.backgroundColor, this.canvas);
        this.scoreLabel = new GameLabel('Score: ', 8, 20);
        this.livesLabel = new GameLabel('Lives: ', this.canvas.width - 65, 20);
        this.paddle = new Paddle(this.paddleXStart, this.paddleYStart, this.paddleWidth, this.paddleHeight, this.paddleColor, this.ctx);
        this.ball = new Ball(0, 0, 2, -2, this.ballRadius, this.ballColor, this.ctx);
        this.bricks = new Bricks({
            cols: this.brickColumnCount,
            rows: this.brickRowCount,
            ctx: this.ctx,
            width: this.brickWidth,
            height: this.brickHeight,
            padding: this.brickPadding,
            offsetLeft: this.brickOffsetLeft,
            offsetTop: this.brickOffsetTop,
            color: this.column1Color,
        });


        this.rightPressed = false;
        this.leftPressed = false;

        this.setup();

        this.draw();
    }

    setup() {
        this.livesLabel.value = 3;
        this.resetBallAndPaddle();
        this.keyDownHandler();
        this.keyUpHandler();
        this.mouseMoveHandler();
    }

    resetBallAndPaddle() {
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height - 30;
        this.ball.dy = -2;
        this.ball.dx = (Math.random() * 4 - 2);
        this.paddle.x = this.paddleXStart;
    }

    collisionDetection() {
        for (let c = 0; c < this.bricks.cols; c += 1) {
            for (let r = 0; r < this.bricks.rows; r += 1) {
                const brick = this.bricks.bricks[c][r];
                if (brick.status === 1) {
                    if (this.ball.x > brick.x &&
                        this.ball.x < brick.x + this.brickWidth &&
                        this.ball.y > brick.y &&
                        this.ball.y < brick.y + this.brickHeight) {
                        this.ball.dy = -this.ball.dy;
                        brick.status = 0;
                        this.scoreLabel.value += 1;
                        if (this.scoreLabel.value === this.bricks.rows * this.bricks.cols) {
                            alert('YOU WIN, CONGRATS!');
                            document.location.reload();
                        }
                    }
                }
            }
        }
    };

    movePaddle() {
        if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
            this.paddle.moveBy(7, 0);
        } else if (this.leftPressed && this.paddle.x > 0) {
            this.paddle.moveBy(-7, 0);
        }
    }

    collisionsWithCanvasAndPaddle() {
        if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius ||
            this.ball.x + this.ball.dx < this.ball.radius) {
            this.ball.dx = -this.ball.dx;
        }
        if (this.ball.y + this.ball.dy < this.ball.radius) {
            this.ball.dy = -this.ball.dy;
        } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
            if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
                this.ball.dy = -this.ball.dy;
            } else {
                this.livesLabel.value -= 1;
                if (this.livesLabel.value < 1) {
                    alert(this.gameOverMessage);
                    document.location.reload();
                } else {
                    this.resetBallAndPaddle();
                }
            }
        }
    }

    keyDownHandler() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowRight') {
                this.rightPressed = true;
            } else if (e.code === 'ArrowLeft') {
                this.leftPressed = true;
            }
        }, false);
    }

    keyUpHandler() {
        document.addEventListener('keyup', (e) => {
            if (e.code === 'ArrowRight') {
                this.rightPressed = false;
            } else if (e.code === 'ArrowLeft') {
                this.leftPressed = false;
            }
        }, false);
    }

    mouseMoveHandler() {
        document.addEventListener('mousemove', (e) => {
            const relativeX = e.clientX - this.canvas.offsetLeft;
            if (this.relativeX > 0 && relativeX < this.canvas.width) {
                this.paddle.moveTo(relativeX - this.paddle.width / 2, this.paddleYStart);
            }
        }, false);
    }

    draw() {
        this.background.render(this.ctx, this.backgroundColor);

        this.bricks.render(this.ctx);
        this.ball.render(this.ctx);
        this.paddle.render(this.ctx);
        this.scoreLabel.render(this.ctx);
        this.livesLabel.render(this.ctx);
        this.collisionDetection();
        this.ball.move();
        this.movePaddle();
        this.collisionsWithCanvasAndPaddle();

        // requestAnimationFrame(this.draw.bind(this));
        requestAnimationFrame(() => {
            this.draw();
        });
    };
}