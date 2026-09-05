const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let CanvasWidth;
let CanvasHeight;

let playerX = 100;
let playerY = 0;
let isJumping = false;

let backgroundX = 0;
let buildingsX = 0;
let frontX = 0;

let backgroundSpeed = 0.4;
let buildingsSpeed = 1;
let frontSpeed = 1.8;

function resizeCanvas() {
    CanvasWidth = canvas.width = window.innerWidth;
    CanvasHeight = canvas.height = window.innerHeight;

    if (!isJumping) {
        playerY = CanvasHeight - 300;
    }
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

const backgroundImg = new Image();
const buildingsImg = new Image();
const frontImg = new Image();

backgroundImg.src = 'assets/background/back.png';
buildingsImg.src = 'assets/background/buildings.png';
frontImg.src = 'assets/background/front.png';

const walkImg = new Image();
const runImg = new Image();
const jumpImg = new Image();
const dashImg = new Image();

walkImg.src = 'assets/character/character_walking.png';
runImg.src = 'assets/character/character_running.png';
jumpImg.src = 'assets/character/character_jumping.png';
dashImg.src = 'assets/character/character_dashing.png';

const spriteWidth = 256;
const spriteHeight = 256;

const columns = 5;

const walkFrames = 18;
const runFrames = 22;
const jumpFrames = 25;
const dashFrames = 25;

let frame = 0;
let gameFrame = 0;

const staggerFrames = 6;

let animation = 'run';

let velocityY = 0;
const gravity = 1.2;
const jumpPower = -20;

let isDashing = false;
let dashTime = 0;

const dashDuration = 50;
const dashSpeed = 14;

function drawLayer(image, position, speed) {

    if (!image.complete || image.naturalWidth === 0) {
        return position;
    }

    const imageWidth = CanvasHeight * (image.naturalWidth / image.naturalHeight);

    position -= speed;

    if (position <= -imageWidth) {
        position += imageWidth;
    }

    ctx.drawImage(
        image,
        position,
        0,
        imageWidth,
        CanvasHeight
    );

    ctx.drawImage(
        image,
        position + imageWidth,
        0,
        imageWidth,
        CanvasHeight
    );

    return position;
}

function startJump() {
    if (!isJumping && !isDashing) {
        isJumping = true;
        velocityY = jumpPower;
        animation = 'jump';
        frame = 0;
    }
}

function startDash() {
    if (!isDashing && !isJumping) {
        isDashing = true;
        dashTime = dashDuration;
        animation = 'dash';
        frame = 0;
    }
}

function updatePlayerPosition() {

    if (isJumping) {
        playerY += velocityY;
        velocityY += gravity;

        if (playerY >= CanvasHeight - 300) {
            playerY = CanvasHeight - 300;
            velocityY = 0;
            isJumping = false;

            animation = 'run';
            frame = 0;
        }
    }

    if (isDashing) {
        playerX += dashSpeed;

        dashTime--;

        if (dashTime <= 0) {
            isDashing = false;
            playerX = 100;

            animation = 'run';
            frame = 0;
        }
    }
}

function animate() {

    ctx.imageSmoothingEnabled = false;

    ctx.fillStyle = '#170f2f';

    ctx.fillRect(
        0,
        0,
        CanvasWidth,
        CanvasHeight
    );

    backgroundX = drawLayer(
        backgroundImg,
        backgroundX,
        backgroundSpeed
    );

    buildingsX = drawLayer(
        buildingsImg,
        buildingsX,
        buildingsSpeed
    );

    frontX = drawLayer(
        frontImg,
        frontX,
        frontSpeed
    );

    let image;
    let totalFrames;

    if (animation == 'run') {
        image = runImg;
        totalFrames = runFrames;
    }

    if (animation == 'walk') {
        image = walkImg;
        totalFrames = walkFrames;
    }

    if (animation == 'jump') {
        image = jumpImg;
        totalFrames = jumpFrames;
    }

    if (animation == 'dash') {
        image = dashImg;
        totalFrames = dashFrames;
    }

    const sourceX =
        (frame % columns) * spriteWidth;

    const sourceY =
        Math.floor(frame / columns) * spriteHeight;

    if (image.complete && image.naturalWidth > 0) {

        ctx.drawImage(
            image,
            sourceX,
            sourceY,
            spriteWidth,
            spriteHeight,
            playerX,
            playerY,
            300,
            300
        );
    }

    gameFrame++;

    if (gameFrame % staggerFrames == 0) {

        frame++;

        if (animation == 'jump') {

            if (frame >= totalFrames) {
                frame = totalFrames - 1;
            }

        } else {

            if (frame >= totalFrames) {
                frame = 0;
            }
        }
    }

    updatePlayerPosition();

    requestAnimationFrame(animate);
}

document.addEventListener('keydown', function(event) {

    if (
        event.key == 'ArrowUp' ||
        event.key == ' '
    ) {
        event.preventDefault();
        startJump();
    }

    if (
        event.key == 'Shift' ||
        event.key == 'x' ||
        event.key == 'X'
    ) {
        startDash();
    }

    if (
        event.key == 'ArrowLeft' ||
        event.key == 'a'
    ) {
        if (!isJumping && !isDashing) {
            animation = 'walk';
            frame = 0;
        }
    }

    if (
        event.key == 'ArrowRight' ||
        event.key == 'd'
    ) {
        if (!isJumping && !isDashing) {
            animation = 'run';
            frame = 0;
        }
    }

});

playerY = CanvasHeight - 300;

animate();