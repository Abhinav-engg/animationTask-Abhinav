import { blockImg, blockImg2, blockImg3 } from './assets.js';
import { getSpeedMultiplier } from './background.js';

const blockImgs = [blockImg, blockImg2, blockImg3];

let obstacles = [];

let obstacleTimer = 0;
let nextObstacleTime = 120;

let obstacleSpeed = 7;

let dashBoost = false;

export function setDashBoost(active) {
    dashBoost = active;
}

export function updateObstacles(CanvasWidth, CanvasHeight) {
    obstacleTimer++;

    if (obstacleTimer >= nextObstacleTime) {
        createObstacle(CanvasWidth, CanvasHeight);

        obstacleTimer = 0;
        nextObstacleTime = Math.floor(Math.random() * 100) + 100;

        if (dashBoost) {
            nextObstacleTime += 100;
        }
    }

    for (let obstacle of obstacles) {
        obstacle.x -= obstacle.speed * getSpeedMultiplier();
    }

    obstacles = obstacles.filter(function(obstacle) {
        return obstacle.x + obstacle.width > 0;
    });
}

function createObstacle(CanvasWidth, CanvasHeight) {
    const randomImg = blockImgs[Math.floor(Math.random() * blockImgs.length)];
    const obstacleHeight = randomImg === blockImg ? 100 : 70;
    const obstacleWidth = randomImg === blockImg ? 140 : 100;
    const obstacleYposition = randomImg == blockImg ? CanvasHeight - 50 - obstacleHeight : CanvasHeight - 70 - obstacleHeight;

    const hitboxOffsetX = randomImg === blockImg ? 20 : 15;
    const hitboxOffsetY = randomImg === blockImg ? 25 : 15;
    const hitboxWidth = randomImg === blockImg ? obstacleWidth - 40 : obstacleWidth - 30;
    const hitboxHeight = randomImg === blockImg ? obstacleHeight - 40 : obstacleHeight - 25;

    obstacles.push({
        x: CanvasWidth + 50,
        y: obstacleYposition,
        width: obstacleWidth,
        height: obstacleHeight,
        hitboxOffsetX: hitboxOffsetX,
        hitboxOffsetY: hitboxOffsetY,
        hitboxWidth: hitboxWidth,
        hitboxHeight: hitboxHeight,
        speed: obstacleSpeed,
        img: randomImg
    });
}

export function drawObstacles(ctx) {
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        if (obstacle.img.complete && obstacle.img.naturalWidth > 0) {
            ctx.drawImage(
                obstacle.img,
                obstacle.x,
                obstacle.y,
                obstacle.width,
                obstacle.height
            );
            ctx.strokeStyle = 'red';
            ctx.strokeRect(
                obstacle.x + obstacle.hitboxOffsetX,
                obstacle.y + obstacle.hitboxOffsetY,
                obstacle.hitboxWidth,
                obstacle.hitboxHeight
            );
        }
    }
}

export function getObstacleUnder(playerLeft, playerRight) {
    for (let obstacle of obstacles) {
        const obstacleLeft = obstacle.x + obstacle.hitboxOffsetX;
        const obstacleRight = obstacleLeft + obstacle.hitboxWidth;

        if (playerRight > obstacleLeft && playerLeft < obstacleRight) {
            return obstacle;
        }
    }

    return null;
}

export function checkObstacleCollision(player) {
    for (let obstacle of obstacles) {

        let playerLeft = player.x;
        let playerRight = player.x + player.width;
        let playerTop = player.y;
        let playerBottom = player.y + player.height;

        let obstacleLeft = obstacle.x + obstacle.hitboxOffsetX;
        let obstacleRight = obstacleLeft + obstacle.hitboxWidth;
        let obstacleTop = obstacle.y + obstacle.hitboxOffsetY;
        let obstacleBottom = obstacleTop + obstacle.hitboxHeight;

        if (playerRight > obstacleLeft) {
            if (playerLeft < obstacleRight) {
                if (playerBottom > obstacleTop) {
                    if (playerTop < obstacleBottom) {
                        return true;
                    }
                }
            }
        }
    }

    return false;
}
export function resetObstacles() {
    obstacles = [];
    obstacleTimer = 0;
    nextObstacleTime = 120;
    dashBoost = false;
}