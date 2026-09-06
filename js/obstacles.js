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

    obstacles.push({
        x: CanvasWidth + 50,
        y: obstacleYposition,
        width: obstacleWidth,
        height: obstacleHeight,
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
            ctx.strokeStyke = 'red';
            ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }
    }
}

export function checkObstacleCollision(player) {
    for (let obstacle of obstacles) {

        let playerLeft = player.x;
        let playerRight = player.x + player.width;
        let playerTop = player.y;
        let playerBottom = player.y + player.height;

        let obstacleLeft = obstacle.x;
        let obstacleRight = obstacle.x + obstacle.width;
        let obstacleTop = obstacle.y;
        let obstacleBottom = obstacle.y + obstacle.height;

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