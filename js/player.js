import {runImg,jumpImg,dashImg,hitImg} from './assets.js';
import { setDashSpeed } from './background.js';
import { setDashBoost, getObstacleUnder } from './obstacles.js';

let playerX = 400;
let playerY = 0;

let velocityY = 0;

const gravity = 0.8;
const jumpPower = -24;

let isJumping = false;
let isDashing = false;
let isHit = false;
let isOnPlatform = false;

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

export function resetPlayer(CanvasHeight) {
    playerY = CanvasHeight - 300;
    isJumping = false;
    isOnPlatform = false;
    isHit = false;
    velocityY = 0;
}

export function isPlayerOnPlatform() {
    return isOnPlatform;
}

export function updatePlayer(CanvasHeight) {

    if (isHit) return;

    const playerLeft = playerX + 50;
    const playerRight = playerLeft + 140;

    const obstacleUnderfoot = getObstacleUnder(playerLeft, playerRight);
    const obstacleTop = obstacleUnderfoot ? obstacleUnderfoot.y + obstacleUnderfoot.hitboxOffsetY : null;

    const baseGroundY = CanvasHeight - 300;

    if (isJumping) {

        const prevBottom = playerY + 230;

        playerY += velocityY;
        velocityY += gravity;

        const newBottom = playerY + 230;

        if (obstacleUnderfoot && velocityY > 0 && prevBottom <= obstacleTop && newBottom >= obstacleTop) {

            playerY = obstacleTop - 230;
            velocityY = 0;

            isJumping = false;
            isOnPlatform = true;

            animation = 'run';
            frame = 0;

        } else if (!obstacleUnderfoot && playerY >= baseGroundY) {

            playerY = baseGroundY;
            velocityY = 0;

            isJumping = false;
            isOnPlatform = false;

            animation = 'run';
            frame = 0;
        }

    } else if (isOnPlatform) {

        if (obstacleUnderfoot) {
            playerY = obstacleTop - 230;
        } else {
            isJumping = true;
            isOnPlatform = false;
            velocityY = 0;
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
        isOnPlatform = false;
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
        isOnPlatform = false;

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
        height: 130
    };
}