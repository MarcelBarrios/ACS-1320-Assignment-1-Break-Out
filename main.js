const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 5;
const brickColumnCount = 3;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const paddleXStart = (canvas.width - paddleWidth) / 2;
const PI2 = Math.PI * 2;
const ballColor = '#FF5733';
const column1Color = '#28B463';
const column2Color = '#2874A6';
const column3Color = '#AF7AC5';
const column4Color = '#F1C40F';
const column5Color = '#E74C3C';
const paddleColor = '#C70039';
const colorWhiteText = '#FFFFFF';
const backgroundColor = '#1C2833';
const gameOverMessage = 'GAME OVER';

let score = 0;
let lives = 3;

class Ball {
    constructor(x = 0, y = 0, dx = -2, dy = -2, radius = 10) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
    }
}

let ball = new Ball();

let paddleX;

resetBallAndPaddle();

let rightPressed = false;
let leftPressed = false;

const bricks = [];

initializeBrick();

function initializeBrick() {
    for (let c = 0; c < brickColumnCount; c += 1) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r += 1) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') {
        rightPressed = true;
    } else if (e.code === 'ArrowLeft') {
        leftPressed = true;
    }
}, false);

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowRight') {
        rightPressed = false;
    } else if (e.code === 'ArrowLeft') {
        leftPressed = false;
    }
}, false);

document.addEventListener('mousemove', (e) => {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}, false);

const collisionDetection = () => {
    for (let c = 0; c < brickColumnCount; c += 1) {
        for (let r = 0; r < brickRowCount; r += 1) {
            const brick = bricks[c][r];
            if (brick.status === 1) {
                if (ball.x > brick.x &&
                    ball.x < brick.x + brickWidth &&
                    ball.y > brick.y &&
                    ball.y < brick.y + brickHeight) {
                    ball.dy = -ball.dy;
                    brick.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        alert('YOU WIN, CONGRATS!');
                        document.location.reload();
                    }
                }
            }
        }
    }
};

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, PI2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
};

const makeBox = (x, y, width, height, color) => {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
};

const drawPaddle = () => {
    makeBox(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, paddleColor);
};

const drawBricks = () => {
    for (let c = 0; c < brickColumnCount; c += 1) {
        for (let r = 0; r < brickRowCount; r += 1) {
            if (bricks[c][r].status === 1) {
                const brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                const brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                const colors = [column1Color, column2Color, column3Color, column4Color, column5Color];
                makeBox(brickX, brickY, brickWidth, brickHeight, colors[r % colors.length]);
            }
        }
    }
};

const drawScore = () => {
    ctx.font = '16px Arial';
    ctx.fillStyle = colorWhiteText;
    ctx.fillText(`Score: ${score}`, 8, 20);
};

const drawLives = () => {
    ctx.font = '16px Arial';
    ctx.fillStyle = colorWhiteText;
    ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
};

function resetBallAndPaddle() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height - 30;
    ball.dx = (Math.random() * 4 - 2);
    ball.dy = -2;
    paddleX = paddleXStart;
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function movePaddle() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}

function collisionsWithCanvasAndPaddle() {
    if (ball.x + ball.dx > canvas.width - ballRadius || ball.x + ball.dx < ballRadius) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy < ballRadius) {
        ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > canvas.height - ballRadius) {
        if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
            ball.dy = -ball.dy;
        } else {
            lives--;
            if (!lives) {
                alert(gameOverMessage);
                document.location.reload();
            } else {
                resetBallAndPaddle();
            }
        }
    }
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    moveBall();
    movePaddle();
    collisionsWithCanvasAndPaddle();

    requestAnimationFrame(draw);
};

draw();
