import Ball from './Ball';
import Sprite from './Sprite';
import Bricks from './Bricks';
import GameLabel from './GameLabel';
import Background from './Background';

class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private ballRadius: number;
    private paddleHeight: number;
    private paddleWidth: number;
    private brickRowCount: number;
    private brickColumnCount: number;
    private brickWidth: number;
    private brickHeight: number;
    private brickPadding: number;
    private brickOffsetTop: number;
    private brickOffsetLeft: number;
    private paddleXStart: number;
    private paddleYStart: number;
    private ballColor: string;
    private paddleColor: string;
    private colorWhiteText: string;
    private backgroundColor: string;
    private gameOverMessage: string;

    private background: Background;
    private scoreLabel: GameLabel;
    private livesLabel: GameLabel;
    private paddle: Sprite;
    private ball: Ball;
    private bricks: Bricks;

    private rightPressed: boolean;
    private leftPressed: boolean;

    constructor(canvasId: string) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!canvas) {
            throw new Error(`Canvas element with ID "${canvasId}" not found.`);
        }

        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        // Game settings
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

        // Initialize objects
        this.background = new Background(this.ctx, this.backgroundColor, this.canvas);
        this.scoreLabel = new GameLabel('Score: ', 8, 20, this.colorWhiteText);
        this.livesLabel = new GameLabel('Lives: ', this.canvas.width - 65, 20, this.colorWhiteText);
        this.paddle = new Sprite(this.paddleXStart, this.paddleYStart, this.paddleWidth, this.paddleHeight, this.paddleColor, this.ctx);
        this.ball = new Ball(0, 0, 2, -2, this.ballRadius, this.ballColor, this.ctx);
        this.bricks = new Bricks(
            this.brickColumnCount,
            this.brickRowCount,
            this.ctx,
            this.brickWidth,
            this.brickHeight,
            this.brickPadding,
            this.brickOffsetLeft,
            this.brickOffsetTop,
            this.colorWhiteText
        );

        // Input states
        this.rightPressed = false;
        this.leftPressed = false;

        this.setup();
        this.draw();
    }
    private setup(): void {
        this.livesLabel.value = 3;
        this.resetBallAndPaddle();
        this.keyDownHandler();
        this.keyUpHandler();
        this.mouseMoveHandler();
    }

    private resetBallAndPaddle(): void {
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height - 30;
        this.ball.dy = -2;
        this.ball.dx = Math.random() * 4 - 2;
        this.paddle.x = this.paddleXStart;
    }

    private collisionDetection(): void {
        for (let c = 0; c < this.bricks.cols; c += 1) {
            for (let r = 0; r < this.bricks.rows; r += 1) {
                const brick = this.bricks.bricks[c][r];
                if (brick.status === 1) {
                    if (
                        this.ball.x > brick.x &&
                        this.ball.x < brick.x + this.brickWidth &&
                        this.ball.y > brick.y &&
                        this.ball.y < brick.y + this.brickHeight
                    ) {
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
    }

    private movePaddle(): void {
        if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
            this.paddle.moveBy(7, 0);
        } else if (this.leftPressed && this.paddle.x > 0) {
            this.paddle.moveBy(-7, 0);
        }
    }

    private collisionsWithCanvasAndPaddle(): void {
        if (
            this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius ||
            this.ball.x + this.ball.dx < this.ball.radius
        ) {
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

    private keyDownHandler(): void {
        document.addEventListener(
            'keydown',
            (e: KeyboardEvent) => {
                if (e.code === 'ArrowRight') {
                    this.rightPressed = true;
                } else if (e.code === 'ArrowLeft') {
                    this.leftPressed = true;
                }
            },
            false
        );
    }

    private keyUpHandler(): void {
        document.addEventListener(
            'keyup',
            (e: KeyboardEvent) => {
                if (e.code === 'ArrowRight') {
                    this.rightPressed = false;
                } else if (e.code === 'ArrowLeft') {
                    this.leftPressed = false;
                }
            },
            false
        );
    }

    private mouseMoveHandler(): void {
        document.addEventListener(
            'mousemove',
            (e: MouseEvent) => {
                const relativeX = e.clientX - this.canvas.offsetLeft;
                if (relativeX > 0 && relativeX < this.canvas.width) {
                    this.paddle.moveTo(relativeX - this.paddle.width / 2, this.paddleYStart);
                }
            },
            false
        );
    }

    private draw(): void {
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

        requestAnimationFrame(() => {
            this.draw();
        });
    }
}

export default Game;