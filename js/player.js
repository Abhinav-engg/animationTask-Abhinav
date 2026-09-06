import {runImg,jumpImg,dashImg,hitImg} from './assets.js';
import { setDashSpeed } from './background.js';
import { setDashBoost } from './obstacles.js';

let playerX = 400;
let playerY = 0;

let velocityY = 0;

const gravity = 0.8;
const jumpPower = -20;

let isJumping = false;
let isDashing = false;
let isHit = false;

let dashTime = 0;

const dashDuration = 50;

const spriteWidth = 256;
const spriteHeight = 256;
const columns = 5;

const runFrames = 22;
const jumpFrames = 25;
const dashFrames = 25;
const hitFrames = 25;

let frame = 0;
let gameFrame = 0;

const staggerFrames = 6;

let animation = 'run';

export function setupPlayer(CanvasHeight) {
    playerY = CanvasHeight - 300;
}

export function resetPlayer(CanvasHeight) {
    setupPlayer(CanvasHeight);
    velocityY = 0;
    isJumping = false;
    isDashing = false;
    isHit = false;
    dashTime = 0;
    frame = 0;
    gameFrame = 0;
    animation = 'run';
    setDashSpeed(false);
    setDashBoost(false);
}

export function updatePlayer(CanvasHeight) {

    if (isHit) return;

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

        dashTime--;

        if (dashTime <= 0) {

            isDashing = false;

            setDashSpeed(false);
            setDashBoost(false);

            animation = 'run';
            frame = 0;
        }
    }
}

export function jump() {

    if (!isJumping && !isDashing && !isHit) {

        isJumping = true;
        velocityY = jumpPower;

        animation = 'jump';
        frame = 0;
    }
}

export function dash() {

    if (!isDashing && !isHit) {

        isDashing = true;
        dashTime = dashDuration;

        setDashSpeed(true);
        setDashBoost(true);

        animation = 'dash';
        frame = 0;
    }
}

export function triggerHit() {

    if (!isHit) {

        isHit = true;
        isJumping = false;
        isDashing = false;

        setDashSpeed(false);
        setDashBoost(false);

        animation = 'hit';
        frame = 0;
    }
}

export function isPlayerHit() {
    return isHit;
}

export function isHitDone() {
    return isHit && frame >= hitFrames - 1;
}

export function drawPlayer(ctx) {

    let image;
    let totalFrames;

    if(animation == 'run') {
        image = runImg;
        totalFrames = runFrames;
    }

    if(animation == 'jump') {
        image =jumpImg;
        totalFrames = jumpFrames;
    }

    if(animation == 'dash') {
        image = dashImg;
        totalFrames = dashFrames;
    }

    if(animation == 'hit') {
        image = hitImg;
        totalFrames = hitFrames;
    }

    const sourceX =(frame % columns) * spriteWidth;
    const sourceY =Math.floor(frame / columns) * spriteHeight;

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
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(playerX + 90, playerY + 100, 90, 150);
    }

    gameFrame++;

    if (gameFrame % staggerFrames == 0) {

        frame++;

        if (animation == 'jump' || animation == 'hit') {

            if (frame >= totalFrames) {
                frame = totalFrames - 1;
            }

        } else {

            if (frame >= totalFrames) {
                frame = 0;
            }
        }
    }
}

export function getPlayerData() {
    return {
        x: playerX + 90,
        y: playerY + 100,
        width: 90,
        height: 150
    };
}