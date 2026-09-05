import { blockImg } from './assets.js';

let obstacles = [];

let obstacleTimer = 0;
let nextObstacleTime = 120;

let obstacleSpeed = 7;

export function updateObstacles(CanvasWidth, CanvasHeight) {
    obstacleTimer++;

    if (obstacleTimer >= nextObstacleTime) {
        createObstacle(CanvasWidth, CanvasHeight);

        obstacleTimer = 0;
        nextObstacleTime = Math.floor(Math.random() * 100) + 100;
    }

    for (let obstacle of obstacles) {
        obstacle.x -= obstacle.speed;
    }

    obstacles = obstacles.filter(function(obstacle) {
        return obstacle.x + obstacle.width > 0;
    });
}

function createObstacle(CanvasWidth, CanvasHeight) {
    obstacles.push({
        x: CanvasWidth + 50,
        y: CanvasHeight - 130,
        width: 50,
        height: 65,
        speed: obstacleSpeed
    });
}

export function drawObstacles(ctx) {
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        if (blockImg.complete && blockImg.naturalWidth > 0) {
            ctx.drawImage(
            blockImg,
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
}